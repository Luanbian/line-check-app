import { type EntityNames } from '../../domain/entities/entity.names'

export interface message {
  to: string
  title: string
  body: string
}

export interface INotificationService {
  send: (accountId: string, data: EntityNames[], token: string) => Promise<void>
}
