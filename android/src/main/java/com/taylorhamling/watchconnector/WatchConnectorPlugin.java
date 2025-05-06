package com.taylorhamling.watchconnector;

import android.util.Log;
import android.content.Context;
import com.getcapacitor.JSObject;
import com.google.android.gms.wearable.MessageClient;
import com.google.android.gms.wearable.MessageEvent;
import com.google.android.gms.wearable.Wearable;
import com.google.android.gms.tasks.OnSuccessListener;

public class WatchConnectorPlugin implements MessageClient.OnMessageReceivedListener {

    private static final String TAG = "WatchConnectorPlugin";
    private static final String MESSAGE_PATH = "/watch_message";

    // Reference to the WatchConnector to access notifyListeners
    private WatchConnector plugin;
    private Context context;

    // Constructor to pass the Capacitor plugin instance
    public WatchConnectorPlugin(WatchConnector plugin, Context context) {
        this.plugin = plugin;
        this.context = context;
        Wearable.getMessageClient(plugin.getContext()).addListener(this);
    }

    // Send a message to Wear OS
    public void sendMessageToWatch(String message) {
        getConnectedNodeId(nodeId -> {
            Wearable.getMessageClient(context)
                .sendMessage(nodeId, MESSAGE_PATH, message.getBytes())
                .addOnSuccessListener(integer -> Log.d(TAG, "Message sent successfully to node: " + nodeId))
                .addOnFailureListener(e -> Log.e(TAG, "Failed to send message", e));
        });
    }

    // Get connected node ID
    private void getConnectedNodeId(OnSuccessListener<String> onSuccessListener) {
        Wearable.getNodeClient(context).getConnectedNodes()
            .addOnSuccessListener(nodes -> {
                if (nodes != null && !nodes.isEmpty()) {
                    onSuccessListener.onSuccess(nodes.get(0).getId());
                }
            });
    }

    @Override
    public void onMessageReceived(MessageEvent messageEvent) {
        if (messageEvent.getPath().equals(MESSAGE_PATH)) {
            String message = new String(messageEvent.getData());
            Log.d(TAG, "Message received from Wear OS: " + message);

            // Create the JSObject and pass the message to JavaScript listeners
            JSObject data = new JSObject();
            data.put("message", message);

            // Notify JavaScript listeners
            plugin.notifyMessageReceived(data);
        }
    }

    // Echo method for testing purposes
    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
