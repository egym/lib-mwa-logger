---
# =============================================================================
# The BMA "/bma-security-fix" command. Everything shared with the other BMA
# repositories lives in egym/egym-ai-toolkit; only this repository's own
# ecosystem is configured here.
#
# The import is pinned to a commit SHA. Bump it, run `gh aw compile` and
# commit the regenerated lock to pick up shared changes; imports resolve at
# compile time, so nothing changes until you do.
# =============================================================================
on:
  slash_command:
    name: bma-security-fix
    events: [issue_comment, pull_request_comment]
    # BOTH entries are required for dual mode. gh-aw emits one activation clause per
    # entry and ORs them: issue_comment gives `issue.pull_request == null` (issue mode)
    # and pull_request_comment gives `issue.pull_request != null` (pull request mode).
    # Listing only one silently disables the other mode.
    # By default only users with write access can invoke it. Keep that default.

# gh-aw requires the consuming workflow to grant every permission its imports
# need, so this block cannot live in the shared file.
permissions:
  contents: read           # agent job stays read-only; every write happens in the safe-output job
  pull-requests: read      # gh-aw strict mode REJECTS pull-requests: write here
  issues: read
  actions: read            # read the failing workflow runs + logs
  copilot-requests: write  # in-Actions engine inference, org-billed, no PAT

imports:
  - egym/egym-ai-toolkit/.github/workflows/shared/bma-security-fix.md@2329a0095e84dda86f3d6ea13fda8ce6a2c5001b

# The shared prompt is a RUNTIME import, and gh-aw validates its expressions
# against a safe list that excludes `github.event.issue.pull_request`, so the
# prompt cannot tell the two modes apart on its own. Resolving it here works
# because GitHub, not gh-aw, evaluates workflow YAML. `env.*` IS safe-listed.
# gh-aw emits this at workflow level, so the activation job that renders the
# prompt inherits it.
env:
  BMA_FIX_MODE: ${{ github.event.issue.pull_request && 'pr' || 'issue' }}

runtimes:
  node:
    version: "24.13.0"   # matches .nvmrc; gh-aw cannot read .nvmrc itself

mcp-scripts:
  npm-run:
    description: "Install dependencies and then run an npm command. Dependencies are ALWAYS installed first, and the lockfile is regenerated automatically if it disagrees with package.json, so do not pass 'ci' or 'install'. Use this for ALL npm invocations. Output (stdout+stderr) is captured and the last 500 lines are returned."
    inputs:
      args:
        type: string
        required: true
        description: "npm arguments to run AFTER dependencies are installed, no shell operators (pipes, redirects). E.g. 'run build' or 'test'. Pass 'ci' only if you want the install alone."
    run: |
      # npm ci exits when package.json and package-lock.json disagree, which is
      # precisely one of the failures this workflow exists to fix.
      if ! npm ci 2>&1 | tail -200; then
        echo "npm ci failed; regenerating the lockfile with npm install"
        npm install 2>&1 | tail -200
      fi
      case "$INPUT_ARGS" in
        ci|install|i|ci\ *|install\ *|i\ *) echo "dependencies already installed" ;;
        *) npm $INPUT_ARGS 2>&1 | tail -500 ;;
      esac
    timeout: 600

network:
  allowed:
    - defaults
    - node
---

## Repository-specific rules

- Run **every** `npm` command through the `npm-run` tool, which installs dependencies first.
