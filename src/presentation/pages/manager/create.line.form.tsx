import React, { useEffect, useState } from 'react'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'
import { Button, ScrollView, Text, TextInput } from 'react-native'
import { type EntityNames } from '../../../domain/entities/entity.names'
import SelectPicker from 'react-native-picker-select'
import DropDownPicker from 'react-native-dropdown-picker'
import { type SubmitHandler, useForm } from 'react-hook-form'

export interface ParamList extends ParamListBase {
  'CREATELINE': { data: EntityNames[] }
}

interface Props {
  route: RouteProp<ParamList, 'CREATELINE'>
}

interface Inputs {
  account: string
  logistic: string
  service: string
  manufacture: string
  vehicle: string
  startJourney: string
  startLine: string
  endLine: string
}

export default function CreateLineForm ({ route }: Props): React.JSX.Element {
  const { data } = route.params
  const { register, setValue, handleSubmit } = useForm<Inputs>()
  const [selectedDays, setSelectedDays] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    register('account')
    register('logistic')
    register('service')
    register('manufacture')
    register('vehicle')
    register('startJourney')
    register('startLine')
    register('endLine')
  }, [register])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
  }

  return (
    <ScrollView>
      <Text>Selecione o motorista</Text>
      <SelectPicker
        onValueChange={(value: string) => { setValue('account', value) }}
        items={data.filter(item => item.origin === 'accounts').map(item => ({
          label: item.name, value: item.name
        }))}
      />
      <Text>Selecione o trajeto</Text>
      <SelectPicker
        onValueChange={(value: string) => { setValue('logistic', value) }}
        items={data.filter(item => item.origin === 'logistics').map(item => ({
          label: item.name, value: item.name
        }))}
      />
      <Text>Selecione o serviço</Text>
      <SelectPicker
        onValueChange={(value: string) => { setValue('service', value) }}
        items={data.filter(item => item.origin === 'services').map(item => ({
          label: item.name, value: item.name
        }))}
      />
      <Text>Selecione a fábrica de destino</Text>
      <SelectPicker
        onValueChange={(value: string) => { setValue('manufacture', value) }}
        items={data.filter(item => item.origin === 'manufactures').map(item => ({
          label: item.name, value: item.name
        }))}
      />
      <Text>Selecione o veiculo</Text>
      <SelectPicker
        onValueChange={(value: string) => { setValue('vehicle', value) }}
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
      <Text>Horário de inicio da jornada</Text>
      <TextInput
        placeholder='inicio jornada'
        onChangeText={(text) => { setValue('startJourney', text) }}
      />
      <Text>Horário de inicio da linha</Text>
      <TextInput
        placeholder='inicio linha'
        onChangeText={(text) => { setValue('startLine', text) }}
      />
      <Text>Horário de fim da jornada</Text>
      <TextInput
        placeholder='fim jornada'
        onChangeText={(text) => { setValue('endLine', text) }}
      />
      <Button title='Criar' onPress={handleSubmit(onSubmit)}/>
    </ScrollView>
  )
}
