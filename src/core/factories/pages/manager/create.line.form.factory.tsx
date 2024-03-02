import React from 'react'
import CreateLineForm, { type ParamList } from '../../../../presentation/pages/manager/create.line.form'
import { type RouteProp } from '@react-navigation/native'
import { makeCreateLine } from '../../data/work/create.line.factory'
import { makeLocalStorage } from '../../infra/adapters/local.storage.factory'

interface Props {
  route: RouteProp<ParamList, 'CREATELINE'>
}

export const makeCreateLineForm: React.FC<Props> = ({ route }) => {
  const createLine = makeCreateLine()
  const localStorage = makeLocalStorage()
  return (
    <CreateLineForm
      route={route}
      createLine={createLine}
      localStorage={localStorage}
    />
  )
}
