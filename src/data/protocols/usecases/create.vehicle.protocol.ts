export interface VehicleParams {
  vehicle: string
}

export interface ICreateVehicle {
  perform: (data: VehicleParams, token: string) => Promise<void>
}
