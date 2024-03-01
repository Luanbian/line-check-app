import React, { useEffect, useState } from 'react'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'
import { Button, FlatList, Text, TextInput } from 'react-native'
import { type EntityNames } from '../../../domain/entities/entity.names'
import SelectPicker from 'react-native-picker-select'
import DropDownPicker from 'react-native-dropdown-picker'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

const fieldsValidationSchema = object({
  account: string().required('O motorista não está selecionado'),
  logistic: string().required('O trajeto não está selecionado'),
  service: string().required('O serviço não está selecionado'),
  manufacture: string().required('A fábrica não está selecionado'),
  vehicle: string().required('O veículo não está selecionado'),
  startJourney: string().required('Horário inválido'),
  startLine: string().required('Horário inválido'),
  endLine: string().required('Horário inválido')
})

export default function CreateLineForm ({ route }: Props): React.JSX.Element {
  const { data } = route.params
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(fieldsValidationSchema)
  })
  const [selectedDays, setSelectedDays] = useState([])
  const [open, setOpen] = useState(false)
  const [errorSelectDay, setErrorSelectDay] = useState(false)

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
    if (selectedDays.length === 0) setErrorSelectDay(true)
    console.log(data)
  }

  return (
    <FlatList ListHeaderComponent={
      <>
        <Text>Selecione o motorista</Text>
        <SelectPicker
          onValueChange={(value: string) => { setValue('account', value) }}
          items={data.filter(item => item.origin === 'accounts').map(item => ({
            label: item.name, value: item.name
          }))}
        />
        {(errors.account != null) && <Text>{errors.account.message}</Text>}
        <Text>Selecione o trajeto</Text>
        <SelectPicker
          onValueChange={(value: string) => { setValue('logistic', value) }}
          items={data.filter(item => item.origin === 'logistics').map(item => ({
            label: item.name, value: item.name
          }))}
        />
        {(errors.logistic != null) && <Text>{errors.logistic.message}</Text>}
        <Text>Selecione o serviço</Text>
        <SelectPicker
          onValueChange={(value: string) => { setValue('service', value) }}
          items={data.filter(item => item.origin === 'services').map(item => ({
            label: item.name, value: item.name
          }))}
        />
        {(errors.service != null) && <Text>{errors.service.message}</Text>}
        <Text>Selecione a fábrica de destino</Text>
        <SelectPicker
          onValueChange={(value: string) => { setValue('manufacture', value) }}
          items={data.filter(item => item.origin === 'manufactures').map(item => ({
            label: item.name, value: item.name
          }))}
        />
        {(errors.manufacture != null) && <Text>{errors.manufacture.message}</Text>}
        <Text>Selecione o veiculo</Text>
        <SelectPicker
          onValueChange={(value: string) => { setValue('vehicle', value) }}
          items={data.filter(item => item.origin === 'vehicles').map(item => ({
            label: item.name, value: item.name
          }))}
        />
        {(errors.vehicle != null) && <Text>{errors.vehicle.message}</Text>}
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
        {(errorSelectDay) && <Text>Erro, selecione os dias</Text>}
        <Text>Horário de inicio da jornada</Text>
        <TextInput
          placeholder='inicio jornada'
          onChangeText={(text) => { setValue('startJourney', text) }}
        />
        {(errors.startJourney != null) && <Text>{errors.startJourney.message}</Text>}
        <Text>Horário de inicio da linha</Text>
        <TextInput
          placeholder='inicio linha'
          onChangeText={(text) => { setValue('startLine', text) }}
        />
        {(errors.startLine != null) && <Text>{errors.startLine.message}</Text>}
        <Text>Horário de fim da jornada</Text>
        <TextInput
          placeholder='fim jornada'
          onChangeText={(text) => { setValue('endLine', text) }}
        />
        {(errors.endLine != null) && <Text>{errors.endLine.message}</Text>}
        <Button title='Criar' onPress={handleSubmit(onSubmit)}/>
      </>}
      data={[]}
      keyExtractor={() => Math.random().toString()}
      renderItem={() => null}
    />
  )
}
