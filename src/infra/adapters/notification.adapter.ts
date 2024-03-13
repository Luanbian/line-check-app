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
  public async notify (): Promise<void> {
    const { status } = await ExpoNotification.getPermissionsAsync()
    if (status !== 'granted') return
    await ExpoNotification.scheduleNotificationAsync({
      content: {
        title: 'test title',
        body: 'test body'
      },
      trigger: null
    })
  }
}
