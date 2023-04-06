type CIConfigItem = {
  value: string;
  description: string;
}

export type CIConfig = {
  appId: CIConfigItem,
  appName: CIConfigItem,
  gitCommitSha: CIConfigItem,
  gitCommitMsg?: CIConfigItem,
  gitRef: CIConfigItem,
  gitRefType: CIConfigItem,
  isAutomatedBuild: CIConfigItem,
  automationId: CIConfigItem,
  automationName: CIConfigItem,
  buildId: CIConfigItem,
  buildNumber: CIConfigItem,
  platform: CIConfigItem,
}