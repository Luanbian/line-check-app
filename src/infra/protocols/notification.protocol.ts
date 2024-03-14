export interface INotification {
  notify: (title: string, body: string) => Promise<void>
  saveToken: (accountId: string) => Promise<void>
}
