export interface MwaLoggerConfig {
  debugMode: boolean;
}

let config: MwaLoggerConfig = {
  debugMode: false,
};

export function setConfig(newConfig: MwaLoggerConfig): void {
  config = { ...config, ...newConfig };
}

export function getConfig(): MwaLoggerConfig {
  return config;
}
