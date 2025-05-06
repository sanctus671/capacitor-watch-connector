import Foundation
import WatchConnectivity

@objc public class WatchConnector: NSObject, WCSessionDelegate {
    private var session: WCSession?
    private var onMessageReceived: ((String) -> Void)?
    private static let TAG = "WatchConnector"
    private static let MESSAGE_PATH = "message"

    override public init() {
        super.init()

        if WCSession.isSupported() {
            session = WCSession.default
            session?.delegate = self
            session?.activate()
        }
    }

    // Set a callback function to handle received messages
    @objc public func setMessageHandler(_ handler: @escaping (String) -> Void) {
        onMessageReceived = handler
    }

    // Echo method for testing
    @objc public func echo(_ value: String) -> String {
        // print("[\(WatchConnector.TAG)] Echo: \(value)")
        return value
    }

    // Send a message to the watch
    @objc public func sendMessageToWatch(_ message: String) {
        guard let session = session else {
            // print("[\(WatchConnector.TAG)] Watch session not available")
            return
        }

        guard session.isReachable else {
            // print("[\(WatchConnector.TAG)] Watch is not reachable")
            return
        }

        session.sendMessage([WatchConnector.MESSAGE_PATH: message], replyHandler: { reply in
            // print("[\(WatchConnector.TAG)] Message sent successfully")
        }) { error in
            // print("[\(WatchConnector.TAG)] Failed to send message: \(error.localizedDescription)")
        }
    }

    // Called when a message is received from the watch
    public func session(_ session: WCSession, didReceiveMessage message: [String: Any]) {
        if let receivedMessage = message[WatchConnector.MESSAGE_PATH] as? String {
            // print("[\(WatchConnector.TAG)] Message received from watch: \(receivedMessage)")
            onMessageReceived?(receivedMessage)
        }
    }

    // Required WCSession delegate methods
    public func sessionDidBecomeInactive(_ session: WCSession) {
        // print("[\(WatchConnector.TAG)] Session became inactive")
    }

    public func sessionDidDeactivate(_ session: WCSession) {
        // print("[\(WatchConnector.TAG)] Session deactivated")
        // Reactivate the session
        WCSession.default.activate()
    }

    public func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        if let error = error {
            // print("[\(WatchConnector.TAG)] Session activation failed: \(error.localizedDescription)")
        } else {
            // print("[\(WatchConnector.TAG)] Session activated successfully with state: \(activationState.rawValue)")
        }
    }
}
