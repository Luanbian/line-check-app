import { NotificationService } from '../../../../data/services/notification.service'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'
import { makeInsertDeviceToken } from './insert.device.token.factory'

export const makeNotificationService = (): NotificationService => {
  const url = 'https://exp.host/--/api/v2/push/send'
  const httpPostClient = makeHttpClient()
  const deviceToken = makeInsertDeviceToken()
  return new NotificationService(url, httpPostClient, deviceToken)
}
