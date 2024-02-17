import { faker } from '@faker-js/faker'
import { UpdateLineCheck } from '../usecases/update.linecheck'
import { HttpClientMock } from './mocks/http.post.client.mock'
import { type IUpdateLineCheck } from '../protocols/usecases/update.linecheck.protocol'
import { paramsMock } from './mocks/update.linecheck.mock'
import { HttpStatusCode } from '../../@types/http.response'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { BadRequest } from '../../core/exceptions/bad.request.error'

interface SutTypes {
  sut: IUpdateLineCheck
  httpClientMock: HttpClientMock
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientMock = new HttpClientMock()
  const sut = new UpdateLineCheck(url, httpClientMock)
  return {
    sut, httpClientMock
  }
}
describe('UpdateLineCheck', () => {
  test('Should call httpClient with correct url and query params', async () => {
    const url = faker.internet.url()
    const { sut, httpClientMock } = makeSut(url)
    await sut.perform(paramsMock)
    const correctUrl = `${url}?workId=${paramsMock.workId}&accountId=${paramsMock.accountId}&marker=${paramsMock.marker}`
    expect(httpClientMock.url).toBe(correctUrl)
  })
  test('Should call httpClient with correct headers', async () => {
    const { sut, httpClientMock } = makeSut()
    await sut.perform(paramsMock)
    expect(httpClientMock.headers).toEqual({
      Authorization: `Bearer ${paramsMock.token}`
    })
  })
  test('should throw unauthorized error with status 401', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.perform(paramsMock)
    await expect(promise).rejects.toThrow(new UnathorizedError())
  })
  test('should throw BadRequest error if httpClient return bad request', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.perform(paramsMock)
    await expect(promise).rejects.toThrow(new BadRequest())
  })
  test('should throw unexpected error if httpClient return no Contet', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.response = {
      statusCode: HttpStatusCode.noContent
    }
    const promise = sut.perform(paramsMock)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
