export class NotPermittedNotification extends Error {
  constructor () {
    super('Usuário não deseja receber notificações')
    this.name = 'NotPermittedNotification'
  }
}
