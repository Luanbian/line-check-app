import { faker } from '@faker-js/faker'
import { type InsertKmParams, type IinsertKm } from '../../protocols/usecases/insert.km.protocol'

export const paramsMock: InsertKmParams = {
  init: faker.number.int(),
  final: faker.number.int()
}
export const makeInsertKmMock = (): IinsertKm => {
  class InsertKmMock implements IinsertKm {
    public async perform (
      params: InsertKmParams,
      workId: string,
      accountId: string,
      token: string
    ): Promise<void> {}
  }
  return new InsertKmMock()
}
