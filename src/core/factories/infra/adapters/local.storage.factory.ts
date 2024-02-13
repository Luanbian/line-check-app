import { LocalStorage } from '../../../../infra/adapters/local.storage.adapter'
import { type ILocalStorage } from '../../../../infra/protocols/local.storage.protocol'

export const makeLocalStorage = (): ILocalStorage => {
  return new LocalStorage()
}
