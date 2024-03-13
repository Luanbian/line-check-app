import { faker } from '@faker-js/faker'
import axios from 'axios'
import { type httpParams } from '../../protocols/http.post.client.protocol'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue({
    data: faker.person,
    status: faker.number
  })
  return mockedAxios
}

export const mockPostRequest = (): httpParams => ({
  url: faker.internet.url(),
  method: 'POST',
  body: faker.person
})
