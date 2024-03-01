import { faker } from '@faker-js/faker'
import { type EntityNames } from '../../../domain/entities/entity.names'

export const entityNamesMock = (): EntityNames => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  origin: faker.hacker.noun()
})
