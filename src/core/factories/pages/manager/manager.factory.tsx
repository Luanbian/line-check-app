import React from 'react'
import Manager from '../../../../presentation/pages/manager/manager'
import { makeLocalStorage } from '../../infra/adapters/local.storage.factory'
import { makeWorkInfoComplete } from '../../data/work/work.info.factory'

export const makeManager: React.FC = () => {
  const localStorage = makeLocalStorage()
  const workInfoComplete = makeWorkInfoComplete()
  return (
    <Manager
      localStorage={ localStorage }
      workInfoComplete={ workInfoComplete }
    />
  )
}
