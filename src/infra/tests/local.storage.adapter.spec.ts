import { faker } from '@faker-js/faker'
import { LocalStorage } from '../adapters/local.storage.adapter'
import { type ILocalStorage } from '../protocols/local.storage.protocol'
import AsyncStorage from '@react-native-async-storage/async-storage'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn()
}))

interface SutTypes {
  sut: ILocalStorage
}

const makeSut = (): SutTypes => {
  const sut = new LocalStorage()
  return {
    sut
  }
}
describe('LocalStorage', () => {
  test('should save item in local storage correctly', async () => {
    const { sut } = makeSut()
    const name = faker.hacker.noun()
    const value = faker.string.uuid()
    await sut.save(name, value)
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(name, value)
  })
  test('should throw an error if save in local storage fail', async () => {
    const { sut } = makeSut()
    const name = faker.hacker.noun()
    const value = faker.string.uuid();
    (AsyncStorage.setItem as jest.Mock).mockImplementation(() => {
      throw new Error('Erro no asyncStorage')
    })
    await expect(sut.save(name, value)).rejects.toThrow('Erro no asyncStorage')
  })
  test('should obtain item in local storage correctly', async () => {
    const { sut } = makeSut()
    const name = faker.hacker.noun()
    const value = faker.string.uuid();
    (AsyncStorage.getItem as jest.Mock).mockImplementation(() => {
      return value
    })
    const response = await sut.obtain(name)
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(name)
    expect(response).toBe(value)
  })
  test('should return null if obtain in local storage fail', async () => {
    const { sut } = makeSut()
    const name = faker.hacker.noun();
    (AsyncStorage.getItem as jest.Mock).mockImplementation(() => {
      return null
    })
    const response = await sut.obtain(name)
    expect(response).toBe(null)
  })
})
