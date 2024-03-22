import { hasHardwareAsync, isEnrolledAsync, authenticateAsync } from 'expo-local-authentication'
import { DeviceNotCompatible } from '../../core/exceptions/device.not.compatible.error'
import { BiometricNotEnrolled } from '../../core/exceptions/biometric.not.enrolled.error'
import { type authSituation, type ILocalAuth } from '../protocols/local.auth.protocol'

export class LocalAuthentication implements ILocalAuth {
  public async authenticate (): Promise<authSituation> {
    await this.hasHardware()
    await this.hasBiometricEnrolled()
    const auth = await authenticateAsync({
      promptMessage: 'Login por biometria',
      fallbackLabel: 'Biometria não reconhecida'
    })
    return {
      isSuccess: auth.success,
      error: auth.success ? undefined : auth.error,
      warning: auth.success ? undefined : auth.warning
    }
  }

  private async hasHardware (): Promise<void> {
    const compatible = await hasHardwareAsync()
    if (!compatible) throw new DeviceNotCompatible()
  }

  private async hasBiometricEnrolled (): Promise<void> {
    const biometricEnrolled = await isEnrolledAsync()
    if (!biometricEnrolled) throw new BiometricNotEnrolled()
  }
}
