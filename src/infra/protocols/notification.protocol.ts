export interface INotification {
  notify: (title: string, body: string) => Promise<void>
}
