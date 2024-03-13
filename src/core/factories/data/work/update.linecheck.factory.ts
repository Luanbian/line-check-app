import { type IUpdateLineCheck } from '../../../../data/protocols/update.linecheck.protocol'
import { UpdateLineCheck } from '../../../../data/usecases/update.linecheck'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeUpdateLinecheck = (): IUpdateLineCheck => {
  const url = 'http://10.0.2.2:8080/api/checkpoint/driver'
  const httpClient = makeHttpClient()
  return new UpdateLineCheck(url, httpClient)
}
