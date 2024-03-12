import { type ICreateLogistic } from '../../../../data/protocols/usecases/logistic.protocol'
import { CreateLogistic } from '../../../../data/usecases/create.logistic'

import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeCreateLogistic = (): ICreateLogistic => {
  const url = 'http://10.0.2.2:8080/api/checkpoint/logistic'
  const httpPostClient = makeHttpClient()
  return new CreateLogistic(url, httpPostClient)
}
