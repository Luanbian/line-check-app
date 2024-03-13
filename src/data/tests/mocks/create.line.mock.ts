import { faker } from '@faker-js/faker'
import { type ICreateLine, type CreateLineCheckParams } from '../../protocols/create.line.protocol'

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

export const makeCreateLineMock = (): ICreateLine => {
  class CreateLineMock implements ICreateLine {
    public async perform (params: CreateLineCheckParams, token: string): Promise<void> {}
  }
  return new CreateLineMock()
}
