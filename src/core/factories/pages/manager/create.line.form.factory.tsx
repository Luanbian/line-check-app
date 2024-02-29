import React from 'react'
import CreateLineForm, { type ParamList } from '../../../../presentation/pages/manager/create.line.form'
import { type RouteProp } from '@react-navigation/native'

interface Props {
  route: RouteProp<ParamList, 'CREATELINE'>
}

export const makeCreateLineForm: React.FC<Props> = ({ route }) => {
  return (
    <CreateLineForm
      route={route}
    />
  )
}
