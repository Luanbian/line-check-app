import { type ICreateVehicle } from '../../../../data/protocols/usecases/create.vehicle.protocol'
import { CreateVehicle } from '../../../../data/usecases/create.vehicle'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeCreateVehicle = (): ICreateVehicle => {
  const url = 'http://10.0.2.2:8080/api/vehicle'
  const httpPostClient = makeHttpClient()
  return new CreateVehicle(url, httpPostClient)
}
