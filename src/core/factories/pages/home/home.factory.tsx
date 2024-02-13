import React from 'react'
import Home from '../../../../presentation/pages/home/home'
import { makeWorkInfo } from '../../data/workInfo/work.info.factory'

export const makeHome: React.FC = () => {
  const workInfo = makeWorkInfo()
  return (
    <Home
      getWorkInfo={workInfo}
    />
  )
}
