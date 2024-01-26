import { describe, expect, test, vi } from 'vitest'
import { HttpClientAdapter } from '../adapters/http.client.adapter'
import axios from 'axios'
import { mockedAxiosResult, requestMock } from './mocks/axios.mock'

vi.mock('axios')
vi.spyOn(axios, 'post').mockResolvedValue(mockedAxiosResult)

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
    const fakeRequest = requestMock()
    await sut.post(fakeRequest)
    expect(axios.post).toHaveBeenCalledWith(fakeRequest.url, fakeRequest.body)
  })
  test('should return the correct statusCode and body', async () => {
    const { sut } = makeSut()
    const response = await sut.post(requestMock())
    expect(response).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
