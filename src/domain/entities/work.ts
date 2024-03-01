import { type EntityNames } from './entity.names'

export interface workProps {
  id: string
  accountName: string
  startJourneyModel: string
  startLineModel: string
  endLineModel: string
  service: string
  logistic: string
  manufacture: string
  vehicle: string
  daysOfTheWeek: string[]
}

export interface workPropsComplete extends workProps {
  startJourneyReal: string
  startLineReal: string
  endLineReal: string
}

export interface workPropsManager {
  works: workPropsComplete[]
  entities: EntityNames[]
}
