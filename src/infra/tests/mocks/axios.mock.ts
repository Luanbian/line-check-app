import { faker } from '@faker-js/faker'
import axios from 'axios'
import { type httpPostParams } from '../../../data/protocols/http/http.post.client.protocol'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({
    data: faker.person,
    status: faker.number
  })
  return mockedAxios
}

export const mockPostRequest = (): httpPostParams => ({
  url: faker.internet.url(),
  body: faker.person
})
