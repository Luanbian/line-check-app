import { faker } from '@faker-js/faker'
import { HttpClientMock } from './mocks/http.post.client.mock'
import { HttpStatusCode } from '../../@types/http.response'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type ICreateManufacture } from '../protocols/usecases/create.manufacture.protocol'
import { CreateManufacture } from '../usecases/create.manufacture'
import { paramsMock } from './mocks/create.manufacture.mock'

interface SutTypes {
  sut: ICreateManufacture
  httpClientMock: HttpClientMock
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientMock = new HttpClientMock()
  const sut = new CreateManufacture(url, httpClientMock)
  return {
    sut, httpClientMock
  }
}
describe('CreateManufacture', () => {
  test('should call Httpclient with correct url, body, method and headers', async () => {
    const url = faker.internet.url()
    const token = faker.internet.ip()
    const { sut, httpClientMock } = makeSut(url)
    await sut.perform(paramsMock, token)
    expect(httpClientMock.url).toBe(url)
    expect(httpClientMock.body).toBe(paramsMock)
    expect(httpClientMock.method).toBe('POST')
    expect(httpClientMock.headers).toEqual({
      Authorization: `Bearer ${token}`
    })
  })
  test('should return unauthorized error with status 401', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.perform(paramsMock, 'fake_token')
    await expect(promise).rejects.toThrow(new UnathorizedError())
  })
  test('should throw BadRequest error if httpClient return bad request', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.perform(paramsMock, 'fake_token')
    await expect(promise).rejects.toThrow(new BadRequest())
  })
  test('should throw unexpected error if httpClient return no Contet', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.noContent
    }
    const promise = sut.perform(paramsMock, 'fake_token')
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
