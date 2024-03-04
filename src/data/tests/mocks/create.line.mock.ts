import { faker } from '@faker-js/faker'
import { type CreateLineCheckParams } from '../../protocols/usecases/create.line.protocol'

export const paramsMock: CreateLineCheckParams = {
  startJourneyModel: '15:00:00',
  startLineModel: '15:30:00',
  endLineModel: '18:00:00',
  manufactureId: faker.string.uuid(),
  accountId: faker.string.uuid(),
  logisticId: faker.string.uuid(),
  vehicleId: faker.string.uuid(),
  serviceId: faker.string.uuid(),
  daysOfTheWeeks: ['MONDAY']
}
