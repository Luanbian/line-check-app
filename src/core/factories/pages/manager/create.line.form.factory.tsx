import React from 'react'
import CreateLineForm, { type ParamList } from '../../../../presentation/pages/manager/create.line.form'
import { type RouteProp } from '@react-navigation/native'
import { makeCreateLine } from '../../data/work/create.line.factory'
import { makeUpdateLine } from '../../data/work/update.line.factory'

interface Props {
  route: RouteProp<ParamList, 'CREATELINE'>
}

export const makeCreateLineForm: React.FC<Props> = ({ route }) => {
  const createLine = makeCreateLine()
  const updateLine = makeUpdateLine()
  return (
    <CreateLineForm
      route={route}
      createLine={createLine}
      updateLine={updateLine}
    />
  )
}
