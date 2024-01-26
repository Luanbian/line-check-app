import { describe, expect, test } from 'vitest'
import { Authentication } from '../usecases/authentication'
import { HttpPostClientMock } from './mocks/http.post.client.mock'

interface SutTypes {
  sut: Authentication
  httpPostClientMock: HttpPostClientMock
}

const makeSut = (url: string = 'any_string'): SutTypes => {
  const httpPostClientMock = new HttpPostClientMock()
  const sut = new Authentication(url, httpPostClientMock)
  return {
    sut,
    httpPostClientMock
  }
}

describe('Authentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = 'fake_url'
    const { sut, httpPostClientMock } = makeSut(url)
    await sut.auth()
    expect(httpPostClientMock.url).toBe(url)
  })
})
