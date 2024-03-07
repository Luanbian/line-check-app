import { faker } from '@faker-js/faker'
import { type UpdateLineParams } from '../../protocols/usecases/update.line.protocol'
import { paramsMock as createLine } from './create.line.mock'

export const paramsMock: UpdateLineParams = {
  params: createLine,
  token: faker.string.uuid(),
  workId: faker.string.uuid()
}
