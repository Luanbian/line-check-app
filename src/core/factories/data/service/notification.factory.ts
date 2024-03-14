import { NotificationService } from '../../../../data/services/notification.service'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeNotificationService = (): NotificationService => {
  const url = 'https://exp.host/--/api/v2/push/send'
  const httpPostClient = makeHttpClient()
  return new NotificationService(url, httpPostClient)
}
