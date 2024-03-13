import { type ICreateLine } from '../../../../data/protocols/create.line.protocol'
import { CreateLine } from '../../../../data/usecases/create.line'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeCreateLine = (): ICreateLine => {
  const url = 'http://10.0.2.2:8080/api/checkpoint/line'
  const httpClient = makeHttpClient()
  return new CreateLine(url, httpClient)
}
