import AsyncStorage from '@react-native-async-storage/async-storage'
import { type ILocalStorage } from '../protocols/local.storage.protocol'

export class LocalStorage implements ILocalStorage {
  public async save (name: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(name, value)
    } catch (error) {
      console.error('Erro ao salvar o item em cache: ', error)
      throw new Error('Erro no asyncStorage')
    }
  }

  public async obtain (name: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(name)
      return value
    } catch (error) {
      console.error('Erro ao obter item em cache:', error)
      throw new Error('Erro no asyncStorage')
    }
  }

  public async clean (): Promise<void> {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
      throw new Error('Erro no asyncStorage')
    }
  }
}
