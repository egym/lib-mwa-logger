type HostWindow = Window & {
  Capacitor?: {
    getPlatform?: () => string;
    PluginHeaders?: { name: string }[];
  };
  CapacitorCustomPlatform?: { name?: string };
  androidBridge?: unknown;
  webkit?: { messageHandlers?: { bridge?: unknown } };
};

export type HostEnvironment = {
  capacitorPlatform?: string;
  deviceOs: 'ios' | 'android' | 'other';
  platformMatchesDevice: boolean;
  hasAndroidBridge: boolean;
  androidBridgeType?: string;
  androidBridgeKeys: string[];
  hasIosBridge: boolean;
  customPlatformName?: string;
  nativePlugins: string[];
  userAgent: string;
};

const getDeviceOs = ({ userAgent, platform, maxTouchPoints }: Navigator): HostEnvironment['deviceOs'] => {
  if (/iPhone|iPad|iPod/.test(platform)) return 'ios';
  if (/Android/.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/.test(userAgent)) return 'ios';
  // iPad web views report a desktop Mac; only touch support tells them apart
  if (platform === 'MacIntel' && maxTouchPoints > 1) return 'ios';

  return 'other';
};

export const getHostEnvironment = (win: Window = window): HostEnvironment => {
  const { Capacitor, CapacitorCustomPlatform, androidBridge, webkit, navigator } = win as HostWindow;
  const capacitorPlatform = Capacitor?.getPlatform?.();
  const deviceOs = getDeviceOs(navigator);

  return {
    capacitorPlatform,
    deviceOs,
    platformMatchesDevice: deviceOs === 'other' || capacitorPlatform === deviceOs,
    hasAndroidBridge: Boolean(androidBridge),
    androidBridgeType: androidBridge ? Object.prototype.toString.call(androidBridge) : undefined,
    androidBridgeKeys: androidBridge ? Object.keys(androidBridge) : [],
    hasIosBridge: Boolean(webkit?.messageHandlers?.bridge),
    customPlatformName: CapacitorCustomPlatform?.name,
    nativePlugins: Capacitor?.PluginHeaders?.map(({ name }) => name) ?? [],
    userAgent: navigator.userAgent,
  };
};
