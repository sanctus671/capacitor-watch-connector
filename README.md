# capacitor-watch-connector

Bridge plugin to connect Capacitor apps to Wear OS and Watch OS devices.

## Install

```bash
npm install capacitor-watch-connector
npx cap sync
```

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`sendMessageToWatch(...)`](#sendmessagetowatch)
* [`addListener('watchMessageReceived', ...)`](#addlistenerwatchmessagereceived-)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### sendMessageToWatch(...)

```typescript
sendMessageToWatch(options: { message: string; }) => Promise<void>
```

| Param         | Type                              |
| ------------- | --------------------------------- |
| **`options`** | <code>{ message: string; }</code> |

--------------------


### addListener('watchMessageReceived', ...)

```typescript
addListener(eventName: 'watchMessageReceived', listenerFunc: (data: { message: string; }) => void) => Promise<any>
```

| Param              | Type                                                 |
| ------------------ | ---------------------------------------------------- |
| **`eventName`**    | <code>'watchMessageReceived'</code>                  |
| **`listenerFunc`** | <code>(data: { message: string; }) =&gt; void</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------

</docgen-api>
