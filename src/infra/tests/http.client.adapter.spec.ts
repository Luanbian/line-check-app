import { faker } from '@faker-js/faker'
import { describe, expect, test, vi } from 'vitest'
import { HttpClientAdapter } from '../adapters/http.client.adapter'
import axios from 'axios'

vi.mock('axios')

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
  test('should call adapter with correct values', async () => {
    const { sut } = makeSut()
    const url = faker.internet.url()
    const body = { any: faker.string.uuid }
    await sut.post({ url, body })
    expect(axios.post).toHaveBeenCalledWith(url, body)
  })
})
