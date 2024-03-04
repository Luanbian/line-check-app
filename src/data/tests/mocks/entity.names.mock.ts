import { faker } from '@faker-js/faker'
import { type EntityNames } from '../../../domain/entities/entity.names'

export const entityNamesMock = (origin: 'accounts' | 'logistics' | 'services' | 'vehicles' | 'manufactures' = 'accounts'): EntityNames => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  origin
})
