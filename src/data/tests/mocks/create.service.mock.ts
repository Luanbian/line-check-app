import { faker } from '@faker-js/faker'
import { type ICreateService, type ServiceParams } from '../../protocols/usecases/create.service.protocol'

export const paramsMock: ServiceParams = {
  service: faker.hacker.noun()
}

export const makeCreateServiceMock = (): ICreateService => {
  class CreateServiceMock implements ICreateService {
    public async perform (data: ServiceParams, token: string): Promise<void> {}
  }
  return new CreateServiceMock()
}
