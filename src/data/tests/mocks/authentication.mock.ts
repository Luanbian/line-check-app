import { faker } from '@faker-js/faker'
import { type IAuthentication, type authParamns } from '../../protocols/authentication.protocol'
import { type accountProps } from '../../../domain/entities/account'

export const authMock = (): authParamns => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const accountMock = (): accountProps => ({
  accessToken: faker.string.uuid()
})

export const makeAuthenticationMock = (): IAuthentication => {
  class AuthenticationMock implements IAuthentication {
    public async auth (params: authParamns): Promise<accountProps> {
      return accountMock()
    }
  }
  return new AuthenticationMock()
}
