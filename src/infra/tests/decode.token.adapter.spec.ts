import { faker } from '@faker-js/faker'
import { DecodeToken } from '../adapters/decode.token.adapter'
import { type IuserData, type IDecodeToken } from '../protocols/decode.token.protocol'
import { jwtDecode } from 'jwt-decode'

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn()
}))

interface SutTypes {
  sut: IDecodeToken
}

const makeSut = (): SutTypes => {
  const sut = new DecodeToken()
  return {
    sut
  }
}
describe('DecodeToken', () => {
  test('should decode token correctly', async () => {
    const { sut } = makeSut()
    const token = faker.string.uuid()
    const expectedUserData: IuserData = {
      role: 'DRIVER',
      sub: faker.string.uuid()
    };
    (jwtDecode as jest.Mock).mockReturnValue(expectedUserData)
    const decoded = sut.decode(token)
    expect(decoded).toEqual(expectedUserData)
  })
  test('should return an error if decoded fails', () => {
    const { sut } = makeSut()
    const invalidToken = faker.string.uuid();
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error('Error during decoding')
    })
    expect(() => sut.decode(invalidToken)).toThrow('Error during decoding')
  })
})
