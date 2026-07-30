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
    events: [pull_request_comment]
    # Fires only on pull request comments containing `/bma-security-fix`; by
    # default only users with write access can invoke it. Keep that default.

# gh-aw requires the consuming workflow to grant every permission its imports
# need, so this block cannot live in the shared file.
permissions:
  contents: read           # agent job stays read-only; the push happens in the safe-output job
  pull-requests: read      # the summary / decline comment is posted by the safe-output job
  issues: read
  actions: read            # read the failing workflow runs + logs
  copilot-requests: write  # in-Actions engine inference, org-billed, no PAT

imports:
  - egym/egym-ai-toolkit/.github/workflows/shared/bma-security-fix.md@e2a7549b633ba57006054863ef86a7b078365f48

runtimes:
  node:
    version: "24.13.0"   # matches .nvmrc; gh-aw cannot read .nvmrc itself

network:
  allowed:
    - defaults
    - node
---

## Repository-specific rules

This repository adds no rules beyond the shared definition.
