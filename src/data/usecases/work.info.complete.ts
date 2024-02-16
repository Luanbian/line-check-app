import { HttpStatusCode } from '../../@types/http.response'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type workPropsComplete } from '../../domain/entities/work'
import { type IHttpClient } from '../protocols/http/http.post.client.protocol'
import { type IWorkInfoComplete } from '../protocols/usecases/work.info.protocol'

export class WorkInfoComplete implements IWorkInfoComplete {
  constructor (
    private readonly url: string,
    private readonly HttpGetClient: IHttpClient
  ) {}

  public async perform (token: string): Promise<workPropsComplete[][]> {
    const httpResponse = await this.HttpGetClient.request({
      url: this.url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return [httpResponse.body as workPropsComplete[]]
      case HttpStatusCode.unathorized: throw new UnathorizedError()
      default: throw new UnexpectedError()
    }
  }
}
