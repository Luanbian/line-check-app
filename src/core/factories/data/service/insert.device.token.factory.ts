import { type IinsertDeviceToken } from '../../../../data/protocols/insert.device.token.protocol'
import { InsertDeviceToken } from '../../../../data/services/insert.device.token'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'
import { makeNotification } from '../../infra/adapters/notification.factory'

export const makeInsertDeviceToken = (): IinsertDeviceToken => {
  const url = 'http://10.0.2.2:8080/api/account/deviceToken'
  const httpClient = makeHttpClient()
  const notificationAdapter = makeNotification()
  return new InsertDeviceToken(url, httpClient, notificationAdapter)
}
