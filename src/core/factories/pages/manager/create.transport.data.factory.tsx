import React from 'react'
import CreateTransportData, { type ParamList } from '../../../../presentation/pages/manager/create.transport.data'
import { type RouteProp } from '@react-navigation/native'

interface Props {
  route: RouteProp<ParamList, 'CREATETRANSPORT'>
}

export const makeCreateTransportData: React.FC<Props> = ({ route }) => {
  return (
    <CreateTransportData
      route={route}
    />
  )
}
