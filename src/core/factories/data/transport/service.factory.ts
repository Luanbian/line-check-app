import { type ICreateService } from '../../../../data/protocols/create.service.protocol'
import { CreateService } from '../../../../data/usecases/create.service'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeCreateService = (): ICreateService => {
  const url = 'http://10.0.2.2:8080/api/service'
  const httpPostClient = makeHttpClient()
  return new CreateService(url, httpPostClient)
}
