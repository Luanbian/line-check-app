import { faker } from '@faker-js/faker'
import { type authParamns } from '../../protocols/usecases/authentication.protocol'
import { type accountProps } from '../../../domain/entities/account'

export const authMock = (): authParamns => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const accountMock = (): accountProps => ({
  accessToken: faker.string.uuid()
})
