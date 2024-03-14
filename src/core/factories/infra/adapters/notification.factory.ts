import { Notification } from '../../../../infra/adapters/notification.adapter'
import { type INotification } from '../../../../infra/protocols/notification.protocol'
import { makeHttpClient } from './http.client.factory'

export const makeNotification = (): INotification => {
  const id = 'da6ccbef-e512-453e-9eff-78cc27524584'
  const url = 'https://exp.host/--/api/v2/push/send'
  const httpPostClient = makeHttpClient()
  return new Notification(id, url, httpPostClient)
}
