import { Authentication } from '../usecases/authentication'
import { HttpPostClientMock } from './mocks/http.post.client.mock'
import { faker } from '@faker-js/faker'
import { accountMock, authMock } from './mocks/authentication.mock'
import { InvalidCredentialsError } from '../../core/exceptions/invalid.credentials.error'
import { HttpStatusCode } from '../../@types/http.response'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'

interface SutTypes {
  sut: Authentication
  httpPostClientMock: HttpPostClientMock
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientMock = new HttpPostClientMock()
  const sut = new Authentication(url, httpPostClientMock)
  return {
    sut,
    httpPostClientMock
  }
}

describe('Authentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientMock } = makeSut(url)
    await sut.auth(authMock())
    expect(httpPostClientMock.url).toBe(url)
  })
  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientMock } = makeSut()
    const authenticationParamns = authMock()
    await sut.auth(authenticationParamns)
    expect(httpPostClientMock.body).toEqual(authenticationParamns)
  })
  test('should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
    const { sut, httpPostClientMock } = makeSut()
    httpPostClientMock.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(authMock())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { sut, httpPostClientMock } = makeSut()
    httpPostClientMock.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(authMock())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an account if HttpPostClient return 200', async () => {
    const { sut, httpPostClientMock } = makeSut()
    const httpResponse = accountMock()
    httpPostClientMock.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponse
    }
    const account = await sut.auth(authMock())
    expect(account).toEqual(httpResponse)
  })
})
