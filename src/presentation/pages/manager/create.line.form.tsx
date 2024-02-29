import React from 'react'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { type workPropsComplete } from '../../../domain/entities/work'

export interface ParamList extends ParamListBase {
  'CREATELINE': { data: workPropsComplete[] }
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
          <Text>{item.accountName}</Text>
        </View>
      ))}
      </Text>
    </View>
  )
}
