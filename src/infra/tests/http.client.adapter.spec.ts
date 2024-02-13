import type axios from 'axios'
import { HttpClientAdapter } from '../adapters/http.client.adapter'
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
    await sut.request(fakeRequest)
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: fakeRequest.url,
      method: 'POST',
      data: fakeRequest.body
    })
  })
  test('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.request(mockPostRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })
  test('should return catch error', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: mockPostRequest()
    })
    const promise = sut.request(mockPostRequest())
    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
