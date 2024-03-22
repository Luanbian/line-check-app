import { getAndroidId } from 'expo-application'
import { type IDeviceToken } from '../protocols/device.token.protocol'

export class DeviceToken implements IDeviceToken {
  public getAndroidToken (): string {
    return getAndroidId()
  }
}
