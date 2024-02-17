import { faker } from '@faker-js/faker'
import { type ILocalStorage } from '../../protocols/local.storage.protocol'

export const makeLocalStorageMock = (): ILocalStorage => {
  class LocalStorageMock implements ILocalStorage {
    public async save (name: string, value: string): Promise<void> {}
    public async obtain (name: string): Promise<string | null> {
      return faker.hacker.noun()
    }
  }
  return new LocalStorageMock()
}
