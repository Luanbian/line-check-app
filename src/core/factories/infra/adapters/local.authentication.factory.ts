import { LocalAuthentication } from '../../../../infra/adapters/local.authentication.adapter'
import { type ILocalAuth } from '../../../../infra/protocols/local.auth.protocol'

export const makeLocalAuthentication = (): ILocalAuth => {
  return new LocalAuthentication()
}
