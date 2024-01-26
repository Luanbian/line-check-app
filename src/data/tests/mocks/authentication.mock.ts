import { faker } from '@faker-js/faker'
import { type authParamns } from '../../protocols/usecases/authentication.protocol'

export const authMock = (): authParamns => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
