import { type IUpdateLine } from '../../../../data/protocols/update.line.protocol'
import { UpdateLine } from '../../../../data/usecases/update.line'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeUpdateLine = (): IUpdateLine => {
  const url = 'http://10.0.2.2:8080/api/checkpoint/line'
  const httpPutClient = makeHttpClient()
  return new UpdateLine(url, httpPutClient)
}
