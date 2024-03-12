import { faker } from '@faker-js/faker'
import { type ICreateLogistic, type LogisticParam } from '../../protocols/usecases/logistic.protocol'

export const paramsMock: LogisticParam = {
  logistic: faker.location.city()
}

export const makeCreateServiceMock = (): ICreateLogistic => {
  class CreateLogisticMock implements ICreateLogistic {
    public async perform (data: LogisticParam, token: string): Promise<void> {}
  }
  return new CreateLogisticMock()
}
