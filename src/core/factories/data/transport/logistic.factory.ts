import { type ICreateLogistic } from '../../../../data/protocols/logistic.protocol'
import { CreateLogistic } from '../../../../data/usecases/create.logistic'

import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeCreateLogistic = (): ICreateLogistic => {
  const url = 'http://10.0.2.2:8080/api/logistic'
  const httpPostClient = makeHttpClient()
  return new CreateLogistic(url, httpPostClient)
}
