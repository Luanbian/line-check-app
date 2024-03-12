import { faker } from '@faker-js/faker'
import { type ICreateManufacture, type ManufactureParams } from '../../protocols/usecases/create.manufacture.protocol'

export const paramsMock: ManufactureParams = {
  manufacture: faker.company.name()
}

export const makeCreateServiceMock = (): ICreateManufacture => {
  class CreateManufactureMock implements ICreateManufacture {
    public async perform (data: ManufactureParams, token: string): Promise<void> {}
  }
  return new CreateManufactureMock()
}
