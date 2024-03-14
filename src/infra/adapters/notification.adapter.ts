import * as ExpoNotification from 'expo-notifications'
import { type INotification } from '../protocols/notification.protocol'
import { type IHttpClient } from '../protocols/http.post.client.protocol'

interface message {
  to: string
  title: string
  body: string
}

ExpoNotification.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

export class Notification implements INotification {
  constructor (
    private readonly id: string,
    private readonly url: string,
    private readonly httpPostClient: IHttpClient
  ) {}

  public async notify (title: string, body: string): Promise<void> {
    const { status } = await ExpoNotification.getPermissionsAsync()
    if (status !== 'granted') return
    const token = await this.getToken()
    const message = this.mountMessage(token, title, body)
    await this.httpPostClient.request({
      method: 'POST',
      url: this.url,
      body: message,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  private async getToken (): Promise<string> {
    return (await ExpoNotification.getExpoPushTokenAsync({ projectId: this.id })).data
  }

  private mountMessage (token: string, title: string, body: string): message {
    const message: message = { to: token, title, body }
    return message
  }
}
