export interface WatchConnectorPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
