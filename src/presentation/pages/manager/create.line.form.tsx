import React, { useEffect, useState } from 'react'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'
import { Button, FlatList, Text } from 'react-native'
import { type EntityNames } from '../../../domain/entities/entity.names'
import SelectPicker from 'react-native-picker-select'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { type CreateLineCheckParams, type ICreateLine } from '../../../data/protocols/usecases/create.line.protocol'

export interface ParamList extends ParamListBase {
  'CREATELINE': { data: EntityNames[] }
}

interface Props {
  route: RouteProp<ParamList, 'CREATELINE'>
  createLine: ICreateLine
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
  startJourney: string().nonNullable().required('O horário para começar a jornada não está selecionado'),
  startLine: string().nonNullable().required('O horário para começar a linha não está selecionado'),
  endLine: string().nonNullable().required('O horário para terminar a jornada não está selecionado')
})

export default function CreateLineForm ({ route, createLine }: Props): React.JSX.Element {
  const { data } = route.params
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(fieldsValidationSchema)
  })
  const [endLineHour, setEndLineHour] = useState('')
  const [startLineHour, setStartLineHour] = useState('')
  const [startJourneyHour, setStartJourneyHour] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>()
  const [open, setOpen] = useState(false)
  const [isVisibleEnd, setIsVisibleEnd] = useState(false)
  const [isVisibleStartLine, setIsVisibleStartLine] = useState(false)
  const [isVisibleStartJourney, setIsVisibleStartJourney] = useState(false)
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
    if (selectedDays != null && selectedDays.length > 0) {
      const params: CreateLineCheckParams = {
        startJourneyModel: data.startJourney,
        startLineModel: data.startLine,
        endLineModel: data.endLine,
        manufactureId: data.manufacture,
        accountId: data.account,
        logisticId: data.logistic,
        vehicleId: data.vehicle,
        serviceId: data.service,
        daysOfTheWeeks: selectedDays
      }
      console.log(params)
    } else {
      setErrorSelectDay(true)
    }
  }
  const handleConfirmEndLineHours = (date: Date): void => {
    setEndLineHour(date.toISOString().substring(11, 19))
    setValue('endLine', endLineHour)
    setIsVisibleEnd(false)
  }
  const handleConfirmStartLineHours = (date: Date): void => {
    setStartLineHour(date.toISOString().substring(11, 19))
    setValue('startLine', startLineHour)
    setIsVisibleStartLine(false)
  }
  const handleConfirmStartJourneyHours = (date: Date): void => {
    setStartJourneyHour(date.toISOString().substring(11, 19))
    setValue('startJourney', startJourneyHour)
    setIsVisibleStartJourney(false)
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
          value={selectedDays ?? []}
          setValue={setSelectedDays}
          multiple
          placeholder='Selecione'
          multipleText={
            selectedDays != null
              ? selectedDays.length > 1
                ? `${selectedDays?.length} dias selecionados`
                : `${selectedDays?.length} dia selecionado`
              : ''
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
        <Button title='Selecionar horário' onPress={() => { setIsVisibleStartJourney(true) }}/>
        <DateTimePicker
          isVisible={isVisibleStartJourney}
          mode='time'
          is24Hour
          date={new Date()}
          onConfirm={handleConfirmStartJourneyHours}
          onCancel={() => { setIsVisibleStartJourney(false) }}
        />
        <Text>{startJourneyHour}</Text>
        {(errors.startJourney != null) && <Text>{errors.startJourney.message}</Text>}
        <Text>Horário de inicio da linha</Text>
        <Button title='Selecionar horário' onPress={() => { setIsVisibleStartLine(true) }}/>
        <DateTimePicker
          isVisible={isVisibleStartLine}
          mode='time'
          is24Hour
          date={new Date()}
          onConfirm={handleConfirmStartLineHours}
          onCancel={() => { setIsVisibleStartLine(false) }}
        />
        <Text>{startLineHour}</Text>
        {(errors.startLine != null) && <Text>{errors.startLine.message}</Text>}
        <Text>Horário de fim da jornada</Text>
        <Button title='Selecionar horário' onPress={() => { setIsVisibleEnd(true) }}/>
        <DateTimePicker
          isVisible={isVisibleEnd}
          mode='time'
          is24Hour
          date={new Date()}
          onConfirm={handleConfirmEndLineHours}
          onCancel={() => { setIsVisibleEnd(false) }}
        />
        <Text>{endLineHour}</Text>
        {(errors.endLine != null) && <Text>{errors.endLine.message}</Text>}
        <Button title='Criar' onPress={handleSubmit(onSubmit)}/>
      </>}
      data={[]}
      keyExtractor={() => Math.random().toString()}
      renderItem={() => null}
    />
  )
}
