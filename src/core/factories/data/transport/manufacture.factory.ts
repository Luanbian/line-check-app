import { type ICreateManufacture } from '../../../../data/protocols/usecases/create.manufacture.protocol'
import { CreateManufacture } from '../../../../data/usecases/create.manufacture'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeCreateManufacture = (): ICreateManufacture => {
  const url = 'http://10.0.2.2:8080/api/manufacture'
  const httpPostClient = makeHttpClient()
  return new CreateManufacture(url, httpPostClient)
}
