import { DeviceToken } from '../../../../infra/adapters/device.token.adapter'
import { type IDeviceToken } from '../../../../infra/protocols/device.token.protocol'

export const makeDeviceToken = (): IDeviceToken => {
  return new DeviceToken()
}
