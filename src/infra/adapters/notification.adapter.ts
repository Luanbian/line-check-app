import * as ExpoNotification from 'expo-notifications'
import { type INotification } from '../protocols/notification.protocol'

ExpoNotification.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})
export class Notification implements INotification {
  constructor (private readonly id: string) {}

  public async notify (): Promise<void> {
    const { status } = await ExpoNotification.getPermissionsAsync()
    if (status !== 'granted') return
    const token = await this.getToken()
    console.log(token)
  }

  private async getToken (): Promise<string> {
    return (await ExpoNotification.getExpoPushTokenAsync({ projectId: this.id })).data
  }
}
