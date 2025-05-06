export interface WatchConnectorPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    sendMessageToWatch(options: {
        message: string;
    }): Promise<void>;
    addListener(eventName: 'watchMessageReceived', listenerFunc: (data: {
        message: string;
    }) => void): Promise<any>;
}
