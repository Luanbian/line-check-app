import { faker } from '@faker-js/faker'
import { type IWorkInfo } from '../protocols/work.info.protocol'
import { WorkInfo } from '../usecases/work.info'
import { HttpClientMock } from './mocks/http.post.client.mock'
import { HttpStatusCode } from '../../@types/http.response'
import { workPropsMock } from './mocks/work.info.mock'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'

interface SutTypes {
  sut: IWorkInfo
  httpClientMock: HttpClientMock
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientMock = new HttpClientMock()
  const sut = new WorkInfo(url, httpClientMock)
  return {
    sut,
    httpClientMock
  }
}

describe('WorkInfo', () => {
  test('should call HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpClientMock } = makeSut(url)
    await sut.perform('fake_token')
    expect(httpClientMock.url).toBe(url)
  })
  test('Should call HttpClient with correct headers', async () => {
    const token = faker.string.uuid()
    const { sut, httpClientMock } = makeSut()
    await sut.perform(token)
    expect(httpClientMock.headers).toEqual({
      Authorization: `Bearer ${token}`
    })
  })
  test('should return statuscode 200 if success', async () => {
    const { sut, httpClientMock } = makeSut()
    const httpResponse = workPropsMock()
    httpClientMock.response = {
      statusCode: 200,
      body: httpResponse
    }
    const response = await sut.perform('fake_token')
    expect(httpClientMock.response.statusCode).toBe(HttpStatusCode.ok)
    expect(httpClientMock.response.body).toBe(response[0])
  })
  test('should return noContent error with status 204', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.noContent
    }
    const response = await sut.perform('fake_token')
    expect(response).toEqual([[]])
  })
  test('should throw unauthorized error with status 401', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.perform('fake_token')
    await expect(promise).rejects.toThrow(new UnathorizedError())
  })
  test('should throw unexpected error if httpClient return bad request', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.perform('fake_token')
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
