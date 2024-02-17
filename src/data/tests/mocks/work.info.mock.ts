import { faker } from '@faker-js/faker'
import { type workProps } from '../../../domain/entities/work'

export const workPropsMock = (): workProps => ({
  id: faker.string.uuid(),
  accountName: faker.person.firstName(),
  startJourneyModel: faker.date.anytime.toString(),
  startLineModel: faker.date.anytime.toString(),
  endLineModel: faker.date.anytime.toString(),
  service: faker.hacker.verb(),
  logistic: faker.location.city(),
  manufacture: faker.company.name(),
  vehicle: faker.vehicle.vehicle(),
  daysOfTheWeek: ['aaaa', 'bbbb', 'ccccc']
})
