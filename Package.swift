// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorWatchConnector",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "CapacitorWatchConnector",
            targets: ["WatchConnectorPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "WatchConnectorPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/WatchConnectorPlugin"),
        .testTarget(
            name: "WatchConnectorPluginTests",
            dependencies: ["WatchConnectorPlugin"],
            path: "ios/Tests/WatchConnectorPluginTests")
    ]
)