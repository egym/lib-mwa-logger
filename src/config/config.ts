export interface MwaLoggerConfig {
  initialized: boolean;
}

let config: MwaLoggerConfig = {
  initialized: false,
};

export function setConfig(newConfig: MwaLoggerConfig): void {
  config = { ...config, ...newConfig };
}

export function getConfig(): MwaLoggerConfig {
  return config;
}
