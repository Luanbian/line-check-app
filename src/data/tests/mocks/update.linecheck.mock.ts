import { faker } from '@faker-js/faker'
import { type IUpdateLineCheck, type UpdateLineCheckParams } from '../../protocols/usecases/update.linecheck.protocol'

export const paramsMock: UpdateLineCheckParams = {
  workId: faker.string.uuid(),
  accountId: faker.string.uuid(),
  marker: 'STARTJOURNEYREAL',
  token: faker.string.uuid()
}

export const makeUpdateLinecheckMock = (): IUpdateLineCheck => {
  class UpdateLinecheckMock implements IUpdateLineCheck {
    public async perform (params: UpdateLineCheckParams): Promise<void> {}
  }
  return new UpdateLinecheckMock()
}
