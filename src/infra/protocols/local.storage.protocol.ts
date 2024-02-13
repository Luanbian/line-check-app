export interface ILocalStorage {
  save: (name: string, value: string) => Promise<void>
  obtain: (name: string) => Promise<string | null>
}
