import { HttpClientAdapter } from '../adapters/http.client.adapter'
import type axios from 'axios'
import { mockAxios, mockPostRequest } from './mocks/axios.mock'

jest.mock('axios')

interface SutTypes {
  sut: HttpClientAdapter
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new HttpClientAdapter()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('HttpClientAdapter', () => {
  test('should call adapter with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const fakeRequest = mockPostRequest()
    await sut.post(fakeRequest)
    expect(mockedAxios.post).toHaveBeenCalledWith(fakeRequest.url, fakeRequest.body)
  })
  test('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
