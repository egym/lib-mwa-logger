import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getHostEnvironment } from './hostEnvironment.ts';

const iPhone = {
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
  platform: 'iPhone',
  maxTouchPoints: 5,
};

const androidPhone = {
  userAgent:
    'Mozilla/5.0 (Linux; Android 16; SM-S921U Build/BP4A.251205.006; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/140.0.0.0 Mobile Safari/537.36',
  platform: 'Linux aarch64',
  maxTouchPoints: 5,
};

const iPadInDesktopMode = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)',
  platform: 'MacIntel',
  maxTouchPoints: 5,
};

const desktopBrowser = {
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  platform: 'MacIntel',
  maxTouchPoints: 0,
};

const iosBridge = { messageHandlers: { bridge: { postMessage: () => undefined } } };

const createCapacitor = (platform: string, pluginNames: string[] = []) => ({
  getPlatform: () => platform,
  PluginHeaders: pluginNames.map((name) => ({ name, methods: [] })),
});

const createWindow = (navigator: object, globals: object = {}) => ({ navigator, ...globals }) as unknown as Window;

describe('getHostEnvironment', () => {
  it('reports a match for an iPhone web view with the iOS bridge', () => {
    const win = createWindow(iPhone, {
      webkit: iosBridge,
      Capacitor: createCapacitor('ios', ['Portals', 'CapacitorNFCPassWallet']),
    });

    assert.deepEqual(getHostEnvironment(win), {
      capacitorPlatform: 'ios',
      deviceOs: 'ios',
      platformMatchesDevice: true,
      hasAndroidBridge: false,
      androidBridgeType: undefined,
      androidBridgeKeys: [],
      hasIosBridge: true,
      customPlatformName: undefined,
      nativePlugins: ['Portals', 'CapacitorNFCPassWallet'],
      userAgent: iPhone.userAgent,
    });
  });

  it('reports a mismatch when an iPhone web view also has an androidBridge object', () => {
    const win = createWindow(iPhone, {
      webkit: iosBridge,
      androidBridge: { postMessage: () => undefined },
      Capacitor: createCapacitor('android', ['Portals']),
    });

    assert.deepEqual(getHostEnvironment(win), {
      capacitorPlatform: 'android',
      deviceOs: 'ios',
      platformMatchesDevice: false,
      hasAndroidBridge: true,
      androidBridgeType: '[object Object]',
      androidBridgeKeys: ['postMessage'],
      hasIosBridge: true,
      customPlatformName: undefined,
      nativePlugins: ['Portals'],
      userAgent: iPhone.userAgent,
    });
  });

  it('reports a mismatch when an iPhone web view has no Capacitor bridge', () => {
    const environment = getHostEnvironment(createWindow(iPhone, { Capacitor: createCapacitor('web') }));

    assert.equal(environment.platformMatchesDevice, false);
    assert.equal(environment.hasIosBridge, false);
    assert.equal(environment.hasAndroidBridge, false);
  });

  it('reports a mismatch when there is no Capacitor global on an iPhone', () => {
    const environment = getHostEnvironment(createWindow(iPhone));

    assert.equal(environment.capacitorPlatform, undefined);
    assert.equal(environment.platformMatchesDevice, false);
    assert.deepEqual(environment.nativePlugins, []);
  });

  it('reports a match for an Android web view with the android bridge', () => {
    const environment = getHostEnvironment(
      createWindow(androidPhone, { androidBridge: {}, Capacitor: createCapacitor('android') })
    );

    assert.equal(environment.deviceOs, 'android');
    assert.equal(environment.platformMatchesDevice, true);
    assert.equal(environment.hasAndroidBridge, true);
  });

  it('reports the name of a custom Capacitor platform', () => {
    const environment = getHostEnvironment(
      createWindow(iPhone, {
        webkit: iosBridge,
        CapacitorCustomPlatform: { name: 'android' },
        Capacitor: createCapacitor('android'),
      })
    );

    assert.equal(environment.customPlatformName, 'android');
    assert.equal(environment.platformMatchesDevice, false);
  });

  it('treats an iPad web view that reports a desktop Mac as iOS', () => {
    const environment = getHostEnvironment(createWindow(iPadInDesktopMode, { Capacitor: createCapacitor('android') }));

    assert.equal(environment.deviceOs, 'ios');
    assert.equal(environment.platformMatchesDevice, false);
  });

  it('trusts navigator.platform when the user agent claims Android on an iPhone', () => {
    const environment = getHostEnvironment(
      createWindow({ ...iPhone, userAgent: androidPhone.userAgent }, { Capacitor: createCapacitor('ios') })
    );

    assert.equal(environment.deviceOs, 'ios');
    assert.equal(environment.platformMatchesDevice, true);
  });

  it('expects no platform in a desktop browser', () => {
    const environment = getHostEnvironment(createWindow(desktopBrowser, { Capacitor: createCapacitor('web') }));

    assert.equal(environment.deviceOs, 'other');
    assert.equal(environment.platformMatchesDevice, true);
  });
});
