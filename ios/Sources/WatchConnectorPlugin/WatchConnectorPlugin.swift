import Foundation
import Capacitor

@objc(WatchConnectorPlugin)
public class WatchConnectorPlugin: CAPPlugin {
    private let implementation = WatchConnector()
    private static let TAG = "WatchConnectorPlugin"

    override public func load() {
        super.load()
        // Set up the message handler to pass messages from WatchConnector to JavaScript
        implementation.setMessageHandler { [weak self] message in
            var data = JSObject()
            data["message"] = message
            self?.notifyListeners("watchMessageReceived", data: data)
        }
    }

    // Expose the echo method
    @objc func echo(_ call: CAPPluginCall) {
        guard let value = call.getString("value") else {
            call.reject("Value is required")
            return
        }

        let result = implementation.echo(value)
        call.resolve([
            "value": result
        ])
    }

    // Expose the sendMessageToWatch method
    @objc func sendMessageToWatch(_ call: CAPPluginCall) {
        guard let message = call.getString("message") else {
            call.reject("Message is required")
            return
        }

        do {
            implementation.sendMessageToWatch(message)
            call.resolve()
        } catch {
            call.reject("Failed to send message to watch", error.localizedDescription)
        }
    }
}
