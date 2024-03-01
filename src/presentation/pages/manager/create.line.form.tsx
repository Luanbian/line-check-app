import React, { useState } from 'react'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { type EntityNames } from '../../../domain/entities/entity.names'
import SelectPicker from 'react-native-picker-select'
import DropDownPicker from 'react-native-dropdown-picker'

export interface ParamList extends ParamListBase {
  'CREATELINE': { data: EntityNames[] }
}

interface Props {
  route: RouteProp<ParamList, 'CREATELINE'>
}

export default function CreateLineForm ({ route }: Props): React.JSX.Element {
  const { data } = route.params
  const [selectedDays, setSelectedDays] = useState([])
  const [open, setOpen] = useState(false)

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
      <Text>Selecione os dias da semana</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={selectedDays}
        setValue={setSelectedDays}
        multiple
        placeholder='Selecione'
        multipleText={
          selectedDays.length > 1
            ? `${selectedDays.length} dias selecionados`
            : `${selectedDays.length} dia selecionado`
        }
        items={[{
          label: 'Domingo', value: 'Sunday'
        }, {
          label: 'Segunda', value: 'Monday'
        }, {
          label: 'Terça', value: 'Tuesday'
        }, {
          label: 'Quarta', value: 'Wednesday'
        }, {
          label: 'Quinta', value: 'Thursday'
        }, {
          label: 'Sexta', value: 'Friday'
        }, {
          label: 'Sábado', value: 'Saturday'
        }]}
      />
    </View>
  )
}
