import React from 'react'
import Home, { type ParamList } from '../../../../presentation/pages/home/home'
import { makeWorkInfo } from '../../data/work/work.info.factory'
import { makeUpdateLinecheck } from '../../data/work/update.linecheck.factory'
import { makeInsertKm } from '../../data/work/insert.km.factory'
import { type RouteProp } from '@react-navigation/native'
import { makeLocalStorage } from '../../infra/adapters/local.storage.factory'

interface Props {
  route: RouteProp<ParamList, 'DRIVER'>
}

export const makeHome: React.FC<Props> = ({ route }) => {
  const workInfo = makeWorkInfo()
  const updateLinecheck = makeUpdateLinecheck()
  const insertKm = makeInsertKm()
  const localStorage = makeLocalStorage()
  return (
    <Home
      getWorkInfo={ workInfo }
      updateLinecheck={ updateLinecheck }
      insertKm={ insertKm }
      localStorage={ localStorage }
      route={ route }
    />
  )
}
