import React from 'react'
import { Text } from 'react-native'
import { type transport } from '../../../domain/entities/transport'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'

export interface ParamList extends ParamListBase {
  'CREATETRANSPORT': { data: transport }
}

interface Props {
  route: RouteProp<ParamList, 'CREATETRANSPORT'>
}

export default function CreateTransportData ({ route }: Props): React.JSX.Element {
  const { data } = route.params
  return (
    <Text>{data}</Text>
  )
}
