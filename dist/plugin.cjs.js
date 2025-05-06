'use strict';

var core = require('@capacitor/core');

const WatchConnector = core.registerPlugin('WatchConnector', {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.WatchConnectorWeb()),
});

class WatchConnectorWeb extends core.WebPlugin {
    constructor() {
        super(...arguments);
        this.listeners = {};
    }
    // Echo method for testing
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    // Simulate sending a message to the watch
    async sendMessageToWatch(options) {
        console.log('Sending message to watch:', options.message);
        // You can implement any simulation logic or emit a message event here
    }
    async addListener(eventName, listenerFunc) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listenerFunc);
        console.log(`Listener added for event: ${eventName}`);
        // Return a PluginListenerHandle with a remove method
        return {
            remove: async () => {
                this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== listenerFunc);
                console.log(`Listener removed for event: ${eventName}`);
            },
        };
    }
    // A method to simulate receiving a message from the watch on the web
    simulateMessageFromWatch(message) {
        console.log('Simulating message received from watch:', message);
        const listeners = this.listeners['watchMessageReceived'];
        if (listeners) {
            listeners.forEach(listener => listener({ message }));
        }
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    WatchConnectorWeb: WatchConnectorWeb
});

exports.WatchConnector = WatchConnector;
//# sourceMappingURL=plugin.cjs.js.map
