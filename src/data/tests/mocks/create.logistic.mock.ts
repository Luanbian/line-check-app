import { faker } from '@faker-js/faker'
import { type ICreateLogistic, type LogisticParam } from '../../protocols/logistic.protocol'

export const paramsMock: LogisticParam = {
  logistic: faker.location.city()
}

export const makeCreateLogisticMock = (): ICreateLogistic => {
  class CreateLogisticMock implements ICreateLogistic {
    public async perform (data: LogisticParam, token: string): Promise<void> {}
  }
  return new CreateLogisticMock()
}
