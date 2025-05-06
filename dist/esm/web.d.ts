import { ListenerCallback, PluginListenerHandle, WebPlugin } from '@capacitor/core';
import type { WatchConnectorPlugin } from './definitions';
export declare class WatchConnectorWeb extends WebPlugin implements WatchConnectorPlugin {
    listeners: {
        [key: string]: Array<(data: {
            message: string;
        }) => void>;
    };
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    sendMessageToWatch(options: {
        message: string;
    }): Promise<void>;
    addListener(eventName: string, listenerFunc: ListenerCallback): Promise<PluginListenerHandle>;
    simulateMessageFromWatch(message: string): void;
}
