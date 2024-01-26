import { describe, expect, test } from 'vitest'
import { Authentication } from '../usecases/authentication'
import { HttpPostClientMock } from './mocks/http.post.client.mock'
import { faker } from '@faker-js/faker'

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
    await sut.auth()
    expect(httpPostClientMock.url).toBe(url)
  })
})
