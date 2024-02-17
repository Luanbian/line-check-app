import { faker } from '@faker-js/faker'
import { type UpdateLineCheckParams } from '../../protocols/usecases/update.linecheck.protocol'

export const paramsMock: UpdateLineCheckParams = {
  workId: faker.string.uuid(),
  accountId: faker.string.uuid(),
  marker: 'STARTJOURNEYREAL',
  token: faker.string.uuid()
}
