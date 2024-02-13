import { HttpStatusCode } from '../../@types/http.response'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type workProps } from '../../domain/entities/work'
import { type IHttpClient } from '../protocols/http/http.post.client.protocol'
import { type IWorkInfo } from '../protocols/usecases/work.info.protocol'

export class WorkInfo implements IWorkInfo {
  constructor (
    private readonly url: string,
    private readonly HttpGetClient: IHttpClient
  ) {}

  public async perform (token: string): Promise<workProps[]> {
    console.log(token)
    const httpResponse = await this.HttpGetClient.request({
      url: this.url,
      method: 'GET'
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return [httpResponse.body as workProps]
      case HttpStatusCode.unathorized: throw new UnathorizedError()
      default: throw new UnexpectedError()
    }
  }
}
