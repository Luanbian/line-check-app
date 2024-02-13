export class UnathorizedError extends Error {
  constructor () {
    super('Você não tem permissão para acessar este conteúdo')
    this.name = 'unathorizedError'
  }
}
