import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'vitest'
import { HttpClientAdapter } from '../adapters/http.client.adapter'

interface SutTypes {
  sut: HttpClientAdapter
}

const makeSut = (): SutTypes => {
  const sut = new HttpClientAdapter()
  return {
    sut
  }
}

describe('HttpClientAdapter', () => {
  test('should call adapter with correct URL', async () => {
    const { sut } = makeSut()
    const url = faker.internet.url()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
