import React from 'react'
import Home from '../../../../presentation/pages/home/home'
import { makeWorkInfo } from '../../data/work/work.info.factory'
import { makeLocalStorage } from '../../infra/adapters/local.storage.factory'

export const makeHome: React.FC = () => {
  const workInfo = makeWorkInfo()
  const localStorage = makeLocalStorage()
  return (
    <Home
      getWorkInfo={ workInfo }
      localStorage={ localStorage }
    />
  )
}
