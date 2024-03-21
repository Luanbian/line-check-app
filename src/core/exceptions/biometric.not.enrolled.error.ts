export class BiometricNotEnrolled extends Error {
  constructor () {
    super('Você não tem uma biometria cadastrada neste dispositivo')
    this.name = 'BiometricNotEnrolled'
  }
}
