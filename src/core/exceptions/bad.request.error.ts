export class BadRequest extends Error {
  constructor () {
    super('Ação não permitida, você não pode alterar dados de outro funcionário')
    this.name = 'BadRequest'
  }
}
