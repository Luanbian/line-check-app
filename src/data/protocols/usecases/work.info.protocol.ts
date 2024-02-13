import { type workProps } from '../../../domain/entities/work'

export interface IWorkInfo {
  perform: () => Promise<workProps[]>
}
