import { type IinsertKm } from '../../../../data/protocols/usecases/insert.km.protocol'
import { InsertKm } from '../../../../data/usecases/insert.km'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeInsertKm = (): IinsertKm => {
  const url = 'http://10.0.2.2:8080/api/checkpoint/km'
  const httpClient = makeHttpClient()
  return new InsertKm(url, httpClient)
}
