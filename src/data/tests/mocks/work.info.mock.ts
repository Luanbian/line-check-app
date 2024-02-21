import { type workPropsComplete, type workProps } from '../../../domain/entities/work'
import { type IWorkInfo } from '../../protocols/usecases/work.info.protocol'

const generateCommonProps = (): workProps => ({
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

export const workPropsCompleteMock = (): workPropsComplete => ({
  ...generateCommonProps(),
  startJourneyReal: 'any_valid_timestamp 2024-01-01 05:05:10',
  startLineReal: 'any_valid_timestamp 2024-01-01 05:35:35',
  endLineReal: 'any_valid_timestamp 2024-01-01 09:15:12'
})

export const makeWorkInfoMock = (): IWorkInfo => {
  class WorkInfoMock implements IWorkInfo {
    public async perform (token: string): Promise<workProps[][]> {
      const workOne = generateCommonProps()
      const workTwo = generateCommonProps()
      return [
        [workOne],
        [workTwo]
      ]
    }
  }
  return new WorkInfoMock()
}
