import { faker } from '@faker-js/faker'
import { type workPropsComplete, type workProps } from '../../../domain/entities/work'

const generateCommonProps = (): workProps => ({
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

export const workPropsMock = (): workProps => generateCommonProps()

export const workPropsCompleteMock = (): workPropsComplete => ({
  ...generateCommonProps(),
  startJourneyReal: faker.date.anytime.toString(),
  startLineReal: faker.date.anytime.toString(),
  endLineReal: faker.date.anytime.toString()
})
