import { type workPropsComplete, type workProps } from '../../../domain/entities/work'

export interface IWorkInfo {
  perform: (token: string) => Promise<workProps[][]>
}

export interface IWorkInfoComplete {
  perform: (token: string) => Promise<workPropsComplete[][]>
}
