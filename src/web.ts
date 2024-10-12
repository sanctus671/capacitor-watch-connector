import { WebPlugin } from '@capacitor/core';

import type { WatchConnectorPlugin } from './definitions';

export class WatchConnectorWeb extends WebPlugin implements WatchConnectorPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
