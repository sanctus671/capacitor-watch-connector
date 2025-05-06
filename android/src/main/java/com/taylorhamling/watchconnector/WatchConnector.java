package com.taylorhamling.watchconnector;

import com.getcapacitor.JSObject;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.wearable.Wearable;

@CapacitorPlugin(name = "WatchConnector")
public class WatchConnector extends Plugin {

    private WatchConnectorPlugin implementation;

    @Override
    public void load() {
        super.load();
        // Initialize the helper plugin with this plugin instance and context
        implementation = new WatchConnectorPlugin(this, getContext());
    }

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");
        if (value == null) {
            call.reject("Value is required");
            return;
        }

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }

    @PluginMethod
    public void sendMessageToWatch(PluginCall call) {
        String message = call.getString("message");
        if (message == null) {
            call.reject("Message is required");
            return;
        }

        try {
            implementation.sendMessageToWatch(message);
            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to send message to watch", e);
        }
    }

    // Notify JavaScript listeners of received messages
    public void notifyMessageReceived(JSObject data) {
        notifyListeners("watchMessageReceived", data);
    }

    @Override
    protected void handleOnDestroy() {
        super.handleOnDestroy();
        // Remove the listener to avoid memory leaks
        Wearable.getMessageClient(getContext()).removeListener(implementation);
    }
}
