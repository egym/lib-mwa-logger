# lib-mwa-logger
The screen logger component that can capture and display request/response data exchanged between web and native apps.

# Components:

## \<EgymMwaDevtools \/>

`<EgymMwaDevtools />` responsible for collection of different log messages and displaying them.

```ts
type Props = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  wrapperStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
};
```

Place it at the top level of your app tree, prefferably outside <IonApp /> component. See [example](https://github.com/egym/mwa-reference/blob/main/src/App.tsx#L46):

```tsx {6}
const App: React.FC = () => {
  const [showLogger] = useStore(getShowLoggerSelector);

  return (
    <Suspense fallback={<span />}>
      {showLogger && <EgymMwaDevtools position="top-right" />}
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout />
        </ErrorBoundary>
      </I18nextProvider>
    </Suspense>
  );
};
```

After you add `<EgymMwaDevtools />` component you will see the debug button on the screen, click it to see messages:

<div style="display: inline-flex; ">
  <img src ="https://user-images.githubusercontent.com/15348910/218138966-c28cbdbb-8186-48dd-ad62-a70f761ce8c1.png" width="200">
  <img src ="https://user-images.githubusercontent.com/15348910/218140112-3829db04-94ae-4112-9191-cddbcfb58036.png" width="200">
</div>

## \<ErrorBoundary \/>

`<ErrorBoundary />` catches errors anywhere in the child component tree, log those errors as WSOD message in the dev tools window, and display a fallback UI instead of the component tree that crashed. See [example](https://github.com/egym/mwa-reference/blob/main/src/App.tsx#L48):

```tsx {8}
const App: React.FC = () => {
  const [showLogger] = useStore(getShowLoggerSelector);

  return (
    <Suspense fallback={<span />}>
      {showLogger && <EgymMwaDevtools position="top-right" />}
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout />
        </ErrorBoundary>
      </I18nextProvider>
    </Suspense>
  );
};
```

<img src ="https://user-images.githubusercontent.com/15348910/218146677-5572ccee-bfb5-43f7-bff9-0dac38c02833.png" width="200">

# Log functions:

## logHttpRequest, logHttpResponse

Should be used in pair to display http request and it's corresponding response, provided requestId will join them in one group.

```ts
declare const logHttpRequest: (method: string, url: string, requestId: string | number, payload?: any) => void;
declare const logHttpResponse: (method: string, url: string, requestId: string | number, response?: any) => void;
```

See [example](https://github.com/egym/mwa-reference/blob/main/src/utils/api/createApiRequest.ts#L58-L85):

```ts {4-7,21,26}
 try {
  const headers = await createHeaders(baseBackendUrl);

  logHttpRequest(method, urlResult, String(requestId), {
    payload: options?.payload,
    headers,
  });

  const response = await CapacitorHttp.request({
    method,
    url: urlResult,
    data: options?.payload,
    responseType: 'json',
    headers,
  });

  return await new Promise((resolve, reject) => {
    if (response.status >= 400 && response.status < 600) {
      reject(response);
    } else {
      logHttpResponse(method, urlResult, requestId, response);
      resolve(response);
    }
  });
} catch (error) {
  logHttpResponse(method, urlResult, requestId, error);
  return Promise.reject(error);
}
```

<img src ="https://user-images.githubusercontent.com/15348910/218145513-6f889aff-8c4f-41c1-b0cb-1f5c2a2132ea.png" width="200">

## logDebug

Log any random message

```ts
declare const logDebug: (text: string, data?: any) => void;
```

See [example](https://github.com/egym/mwa-reference/blob/main/src/index.tsx#L51):

```ts
logDebug('initialContext', initialContext);
```

<img src ="https://user-images.githubusercontent.com/15348910/218204891-8aee4d18-7b3a-4bfb-b13d-cec444d527f6.png" width="200">

## logPortalsRequest, logPortalsResponse

Log portals pub/sub messages

```ts
declare const logPortalsRequest: (topic: string, data?: any) => void;
declare const logPortalsResponse: (topic: string, data?: any) => void;
```

It is recommended to wrap the `Portals.publish` call with a custom implementation that includes a log request, so this way every publish event is captured and displayed in the logger window:

```ts
export const portalsPublish: PortalsPlugin['publish'] = async (message) => {
  logPortalsRequest(`${message.topic} ${message.data.type}`, message.data);

  await Portals.publish(message);
};
```

Same for `Portals.subscribe`:

```ts
export const portalsSubscribe = async <T>(
  options: SubscribeOptions,
  callback: SubscriptionCallback<T>
): Promise<PortalSubscription> => {
  return Portals.subscribe<T>(options, (...args) => {
    logPortalsResponse(options.topic, {
      ...options,
      ...args,
    });
    callback(...args);
  });
};
```

<img src ="https://user-images.githubusercontent.com/15348910/218205043-ee80b01f-75bb-4b14-944f-be991409e755.png" width="200">

## logWebWitals

```
export declare const logWebWitals: (metric: any) => void;
```

Pass this function to the `reportWebVitals` to log results of performance metrics [src/index.tsx#77](https://github.com/egym/mwa-reference/blob/main/src/index.tsx#L77):

```ts
reportWebVitals(logWebWitals);
```

<img src ="https://user-images.githubusercontent.com/15348910/218205131-61bc64e2-7905-4ab0-978f-3709b963d4a7.png" width="200">
