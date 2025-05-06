export interface WatchConnectorPlugin {
    echo(options: { value: string }): Promise<{ value: string }>;
    sendMessageToWatch(options: { message: string }): Promise<void>;
  
    // Event listener for receiving messages from the watch
    addListener(
        eventName: 'watchMessageReceived',
        listenerFunc: (data: { message: string }) => void
      ): Promise<any>;
  }