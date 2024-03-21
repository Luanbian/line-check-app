export class DeviceNotCompatible extends Error {
  constructor () {
    super('Seu dispositivo não suporta autenticação por biometria ou facial ID')
    this.name = 'DeviceNotCompatible'
  }
}
