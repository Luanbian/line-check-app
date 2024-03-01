import React from 'react'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { type EntityNames } from '../../../domain/entities/entity.names'
import SelectPicker from 'react-native-picker-select'

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
      <Text>Selecione o motorista</Text>
      <SelectPicker
        onValueChange={() => {}}
        items={data.filter(item => item.origin === 'accounts').map(item => ({
          label: item.name, value: item.name
        }))}
      />
      <Text>Selecione o trajeto</Text>
      <SelectPicker
        onValueChange={() => {}}
        items={data.filter(item => item.origin === 'logistics').map(item => ({
          label: item.name, value: item.name
        }))}
      />
      <Text>Selecione o serviço</Text>
      <SelectPicker
        onValueChange={() => {}}
        items={data.filter(item => item.origin === 'services').map(item => ({
          label: item.name, value: item.name
        }))}
      />
      <Text>Selecione a fábrica de destino</Text>
      <SelectPicker
        onValueChange={() => {}}
        items={data.filter(item => item.origin === 'manufactures').map(item => ({
          label: item.name, value: item.name
        }))}
      />
      <Text>Selecione o veiculo</Text>
      <SelectPicker
        onValueChange={() => {}}
        items={data.filter(item => item.origin === 'vehicles').map(item => ({
          label: item.name, value: item.name
        }))}
      />
    </View>
  )
}
