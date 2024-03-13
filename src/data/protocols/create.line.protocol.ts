export interface CreateLineCheckParams {
  startJourneyModel: string
  startLineModel: string
  endLineModel: string
  manufactureId: string
  accountId: string
  logisticId: string
  vehicleId: string
  serviceId: string
  daysOfTheWeeks: string[]
}

export interface ICreateLine {
  perform: (params: CreateLineCheckParams, token: string) => Promise<void>
}
