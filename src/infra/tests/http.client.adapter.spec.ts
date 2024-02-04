import { HttpClientAdapter } from '../adapters/http.client.adapter'
import { type AxiosError } from 'axios'
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
  test('should return http error if axios return own error', async () => {
    const { sut, mockedAxios } = makeSut()
    const mockedError: AxiosError = {
      isAxiosError: true,
      message: 'Some error message',
      name: 'Axios error',
      toJSON: {} as any,
      response: {
        config: {
          headers: {} as any
        },
        data: 'Error data',
        headers: {} as any,
        status: 400,
        statusText: 'Erro message text'
      }
    }
    mockedAxios.post.mockRejectedValueOnce(mockedError)
    try {
      await sut.post(mockPostRequest())
    } catch (error) {
      expect((error as AxiosError).isAxiosError).toBe(true)
      expect((error as AxiosError).response).toEqual({
        config: {
          headers: {} as any
        },
        data: 'Error data',
        headers: {} as any,
        status: 400,
        statusText: 'Erro message text'
      })
    }
  })
})
