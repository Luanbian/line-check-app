import { faker } from '@faker-js/faker'
import { type VehicleParams, type ICreateVehicle } from '../../protocols/usecases/create.vehicle.protocol'

export const paramsMock: VehicleParams = {
  vehicle: faker.vehicle.vehicle()
}

export const makeCreateVehicleMock = (): ICreateVehicle => {
  class CreateVehicleMock implements ICreateVehicle {
    public async perform (data: VehicleParams, token: string): Promise<void> {}
  }
  return new CreateVehicleMock()
}
