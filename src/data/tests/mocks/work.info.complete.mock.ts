import { type workPropsManager, type workPropsComplete } from '../../../domain/entities/work'
import { type IWorkInfoComplete } from '../../protocols/work.info.protocol'
import { entityNamesMock } from './entity.names.mock'
import { generateCommonProps } from './work.info.mock'

export const workPropsCompleteMock = (): workPropsComplete => ({
  ...generateCommonProps(),
  startJourneyReal: 'any_valid_timestamp 2024-01-01 05:05:10',
  startLineReal: 'any_valid_timestamp 2024-01-01 05:35:35',
  endLineReal: 'any_valid_timestamp 2024-01-01 09:15:12'
})

export const makeWorkInfoCompleteMock = (): IWorkInfoComplete => {
  class WorkInfoCompleteMock implements IWorkInfoComplete {
    public async perform (token: string): Promise<workPropsManager> {
      const workOne = workPropsCompleteMock()
      const entityOne = entityNamesMock()
      const entityTwo = entityNamesMock()
      return {
        works: [workOne],
        entities: [entityOne, entityTwo]
      }
    }
  }
  return new WorkInfoCompleteMock()
}
