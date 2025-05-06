import { registerPlugin } from '@capacitor/core';
const WatchConnector = registerPlugin('WatchConnector', {
    web: () => import('./web').then((m) => new m.WatchConnectorWeb()),
});
export * from './definitions';
export { WatchConnector };
//# sourceMappingURL=index.js.map