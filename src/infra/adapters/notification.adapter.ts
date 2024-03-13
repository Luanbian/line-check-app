import * as ExpoNotification from 'expo-notifications'

ExpoNotification.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})
export class Notification {
  public async notify (): Promise<void> {
    const { status } = await ExpoNotification.getPermissionsAsync()
    console.log(status)
  }

  public async getToken (): Promise<string> {
    return (await ExpoNotification.getExpoPushTokenAsync()).data
  }
}
