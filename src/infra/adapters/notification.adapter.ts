import { type INotification } from '../protocols/notification.protocol'

export class Notification implements INotification {
  public async getToken (): Promise<string> {
    return 'implements get device token'
  }
}
