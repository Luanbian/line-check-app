import { BiometricAuth } from '../../../../data/usecases/biometric.authentication'
import { makeDeviceToken } from '../../infra/adapters/device.token.factory'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'
import { makeLocalAuthentication } from '../../infra/adapters/local.authentication.factory'

export const makeBiometricAuth = (): BiometricAuth => {
  const localAuth = makeLocalAuthentication()
  const device = makeDeviceToken()
  const url = ''
  const httpPostClient = makeHttpClient()
  return new BiometricAuth(localAuth, device, url, httpPostClient)
}
