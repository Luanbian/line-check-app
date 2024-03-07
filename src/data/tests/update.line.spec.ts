import { faker } from '@faker-js/faker'
import { UpdateLine } from '../usecases/update.line'
import { HttpClientMock } from './mocks/http.post.client.mock'
import { type IUpdateLine } from '../protocols/usecases/update.line.protocol'
import { HttpStatusCode } from '../../@types/http.response'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { paramsMock } from './mocks/create.line.mock'

interface SutTypes {
  sut: IUpdateLine
  httpClientMock: HttpClientMock
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientMock = new HttpClientMock()
  const sut = new UpdateLine(url, httpClientMock)
  return {
    sut, httpClientMock
  }
}

describe('UpdateLine', () => {
  test('should call Httpclient with correct url, body, method and headers', async () => {
    const url = faker.internet.url()
    const { sut, httpClientMock } = makeSut(url)
    const workId = faker.string.uuid()
    const token = faker.string.uuid()
    await sut.perform(paramsMock, workId, token)
    expect(httpClientMock.url).toBe(`${url}?workId=${workId}`)
    expect(httpClientMock.body).toBe(paramsMock)
    expect(httpClientMock.method).toBe('PUT')
    expect(httpClientMock.headers).toEqual({
      Authorization: `Bearer ${token}`
    })
  })
  test('should return unauthorized error with status 401', async () => {
    const { sut, httpClientMock } = makeSut()
    const workId = faker.string.uuid()
    const token = faker.string.uuid()
    httpClientMock.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.perform(paramsMock, workId, token)
    await expect(promise).rejects.toThrow(new UnathorizedError())
  })
  test('should throw BadRequest error if httpClient return bad request', async () => {
    const { sut, httpClientMock } = makeSut()
    const workId = faker.string.uuid()
    const token = faker.string.uuid()
    httpClientMock.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.perform(paramsMock, workId, token)
    await expect(promise).rejects.toThrow(new BadRequest())
  })
  test('should throw unexpected error if httpClient return no Contet', async () => {
    const { sut, httpClientMock } = makeSut()
    const workId = faker.string.uuid()
    const token = faker.string.uuid()
    httpClientMock.response = {
      statusCode: HttpStatusCode.noContent
    }
    const promise = sut.perform(paramsMock, workId, token)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
