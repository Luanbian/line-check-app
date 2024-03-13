import { Notification } from '../../../../infra/adapters/notification.adapter'
import { type INotification } from '../../../../infra/protocols/notification.protocol'

export const makeNotification = (): INotification => {
  const id = 'da6ccbef-e512-453e-9eff-78cc27524584'
  return new Notification(id)
}
