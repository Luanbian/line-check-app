import { type workPropsDriver, type workPropsManager } from '../../domain/entities/work'

export interface IWorkInfo {
  perform: (token: string) => Promise<workPropsDriver>
}

export interface IWorkInfoComplete {
  perform: (token: string) => Promise<workPropsManager>
}
