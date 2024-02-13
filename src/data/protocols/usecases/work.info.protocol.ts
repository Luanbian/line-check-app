import { type workProps } from '../../../domain/entities/work'

export interface IWorkInfo {
  perform: (token: string) => Promise<workProps[]>
}
