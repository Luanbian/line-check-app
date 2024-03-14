import * as ExpoNotification from 'expo-notifications'
import { type INotification } from '../protocols/notification.protocol'
import { NotPermittedNotification } from '../../core/exceptions/not.permitted.notification.error'

ExpoNotification.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

export class Notification implements INotification {
  constructor (
    private readonly id: string
  ) {}

  public async getToken (): Promise<string> {
    await this.getPermission()
    const token = (await ExpoNotification.getExpoPushTokenAsync({ projectId: this.id })).data
    return token
  }

  private async getPermission (): Promise<void> {
    const { status } = await ExpoNotification.getPermissionsAsync()
    if (status !== 'granted') throw new NotPermittedNotification()
  }
}
