import React from 'react'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { type EntityNames } from '../../../domain/entities/entity.names'

export interface ParamList extends ParamListBase {
  'CREATELINE': { data: EntityNames[] }
}

interface Props {
  route: RouteProp<ParamList, 'CREATELINE'>
}

export default function CreateLineForm ({ route }: Props): React.JSX.Element {
  const { data } = route.params
  return (
    <View>
      <Text>
      {data.map(item => (
        <View key={item.id}>
          <Text>{item.name}</Text>
        </View>
      ))}
      </Text>
    </View>
  )
}
