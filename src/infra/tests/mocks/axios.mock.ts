import { faker } from '@faker-js/faker'
import { type httpPostParams } from '../../../data/protocols/http/http.post.client.protocol'

export const mockedAxiosResult = {
  data: {
    content: faker.string.uuid
  },
  status: faker.number.int
}

export const requestMock = (): httpPostParams => ({
  url: faker.internet.url(),
  body: {
    any: faker.string.uuid
  }
})
