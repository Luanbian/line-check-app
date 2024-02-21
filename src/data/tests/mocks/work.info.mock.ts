import { type workProps } from '../../../domain/entities/work'
import { type IWorkInfo } from '../../protocols/usecases/work.info.protocol'

export const generateCommonProps = (): workProps => ({
  id: 'fake_id',
  accountName: 'any_valid_name',
  startJourneyModel: 'fake_time 05:00:00',
  startLineModel: 'fake_time 05:30:00',
  endLineModel: 'fake_time 09:00:00',
  service: 'any_valid_service',
  logistic: 'any_valid_location',
  manufacture: 'any_valid_manufacture',
  vehicle: 'any_valid_vehicle',
  daysOfTheWeek: ['aaaa', 'bbbb', 'ccccc']
})

export const workPropsMock = (): workProps => generateCommonProps()

export const makeWorkInfoMock = (): IWorkInfo => {
  class WorkInfoMock implements IWorkInfo {
    public async perform (token: string): Promise<workProps[][]> {
      const workOne = workPropsMock()
      const workTwo = workPropsMock()
      return [
        [workOne],
        [workTwo]
      ]
    }
  }
  return new WorkInfoMock()
}
