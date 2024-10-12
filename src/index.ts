import { registerPlugin } from '@capacitor/core';

import type { WatchConnectorPlugin } from './definitions';

const WatchConnector = registerPlugin<WatchConnectorPlugin>('WatchConnector', {
  web: () => import('./web').then((m) => new m.WatchConnectorWeb()),
});

export * from './definitions';
export { WatchConnector };
