import { Notification } from '../../../../infra/adapters/notification.adapter'
import { type INotification } from '../../../../infra/protocols/notification.protocol'

export const makeNotification = (): INotification => {
  return new Notification()
}
