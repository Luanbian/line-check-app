import { type IWorkInfoComplete, type IWorkInfo } from '../../../../data/protocols/usecases/work.info.protocol'
import { WorkInfo } from '../../../../data/usecases/work.info'
import { WorkInfoComplete } from '../../../../data/usecases/work.info.complete'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeWorkInfo = (): IWorkInfo => {
  const url = 'http://10.0.2.2:8080/api/checkpoint/driver'
  const httpClient = makeHttpClient()
  return new WorkInfo(url, httpClient)
}

export const makeWorkInfoComplete = (): IWorkInfoComplete => {
  const url = 'http://10.0.2.2:8080/api/checkpoint/manager'
  const httpClient = makeHttpClient()
  return new WorkInfoComplete(url, httpClient)
}
