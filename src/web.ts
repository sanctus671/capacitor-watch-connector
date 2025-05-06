import { ListenerCallback, PluginListenerHandle, WebPlugin } from '@capacitor/core';

import type { WatchConnectorPlugin } from './definitions';

export class WatchConnectorWeb extends WebPlugin implements WatchConnectorPlugin {
  public listeners: { [key: string]: Array<(data: { message: string }) => void> } = {};

  // Echo method for testing
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  // Simulate sending a message to the watch
  async sendMessageToWatch(options: { message: string }): Promise<void> {
    console.log('Sending message to watch:', options.message);
    // You can implement any simulation logic or emit a message event here
  }

  
  async addListener(
    eventName: string,
    listenerFunc: ListenerCallback
  ): Promise<PluginListenerHandle> {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(listenerFunc);
    console.log(`Listener added for event: ${eventName}`);

    // Return a PluginListenerHandle with a remove method
    return {
      remove: async () => {
        this.listeners[eventName] = this.listeners[eventName].filter(
          listener => listener !== listenerFunc
        );
        console.log(`Listener removed for event: ${eventName}`);
      },
    };
  }

  // A method to simulate receiving a message from the watch on the web
  simulateMessageFromWatch(message: string) {
    console.log('Simulating message received from watch:', message);
    const listeners = this.listeners['watchMessageReceived'];
    if (listeners) {
      listeners.forEach(listener => listener({ message }));
    }
  }
}
