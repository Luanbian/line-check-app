import React, { useState } from 'react'
import { type ParamListBase, type RouteProp } from '@react-navigation/native'
import { Button, FlatList, Text, View } from 'react-native'
import { type EntityNames } from '../../../domain/entities/entity.names'
import DropDownPicker from 'react-native-dropdown-picker'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { type CreateLineCheckParams, type ICreateLine } from '../../../data/protocols/usecases/create.line.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import SelectInput from '../../components/input/select.input'
import TimePicker from '../../components/input/time.input'
import { createLineValidationSchema } from '../../../validation/create.line.validation'

export interface ParamList extends ParamListBase {
  'CREATELINE': { data: EntityNames[] }
}

interface Props {
  route: RouteProp<ParamList, 'CREATELINE'>
  createLine: ICreateLine
  localStorage: ILocalStorage
}

export interface Inputs {
  account: string
  logistic: string
  service: string
  manufacture: string
  vehicle: string
  startJourney: string
  startLine: string
  endLine: string
}

export default function CreateLineForm ({ route, createLine, localStorage }: Props): React.JSX.Element {
  const { data } = route.params
  const { setValue, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(createLineValidationSchema)
  })

  const [selectedDays, setSelectedDays] = useState<string[]>()
  const [open, setOpen] = useState(false)
  const [errorSelectDay, setErrorSelectDay] = useState(false)

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
      const token = await localStorage.obtain('token')
      if (token != null) {
        await createLine.perform(params, token)
      }
    } else {
      setErrorSelectDay(true)
    }
  }

  return (
    <FlatList testID='flatList' ListHeaderComponent={
      <>
        <Text testID='sltDriver'>Selecione o motorista</Text>
        <SelectInput data={data} origin='accounts' setValue={setValue} errors={errors} input='account'/>
        <Text testID='sltRoad'>Selecione o trajeto</Text>
        <SelectInput data={data} origin='logistics' setValue={setValue} errors={errors} input='logistic'/>
        <Text testID='sltService'>Selecione o serviço</Text>
        <SelectInput data={data} origin='services' setValue={setValue} errors={errors} input='service'/>
        <Text testID='sltManufacture'>Selecione a fábrica de destino</Text>
        <SelectInput data={data} origin='manufactures' setValue={setValue} errors={errors} input='manufacture'/>
        <Text testID='sltVehicle'>Selecione o veiculo</Text>
        <SelectInput data={data} origin='vehicles' setValue={setValue} errors={errors} input='vehicle'/>
        <Text testID='sltDayOfWeek'>Selecione os dias da semana</Text>
        <View testID='dropDownPicker'>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            value={selectedDays ?? []}
            setValue={setSelectedDays}
            multiple
            placeholder='Selecione'
            maxHeight={300}
            multipleText={
              selectedDays != null
                ? selectedDays.length > 1
                  ? `${selectedDays?.length} dias selecionados`
                  : `${selectedDays?.length} dia selecionado`
                : ''
            }
            items={[
              { label: 'Domingo', value: 'SUNDAY' },
              { label: 'Segunda', value: 'MONDAY' },
              { label: 'Terça', value: 'TUESDAY' },
              { label: 'Quarta', value: 'WEDNESDAY' },
              { label: 'Quinta', value: 'THURSDAY' },
              { label: 'Sexta', value: 'FRIDAY' },
              { label: 'Sábado', value: 'SATURDAY' }
            ]}
          />
          {(errorSelectDay) && <Text testID='error-message'>Erro, selecione os dias</Text>}
        </View>
        <Text testID='putInitJourney'>Horário de inicio da jornada</Text>
        <TimePicker input='startJourney' setValue={setValue} errors={errors}/>
        <Text testID='putInitLine'>Horário de inicio da linha</Text>
        <TimePicker input='startLine' setValue={setValue} errors={errors}/>
        <Text testID='putEndLine'>Horário de fim da jornada</Text>
        <TimePicker input='endLine' setValue={setValue} errors={errors}/>
        <Button testID='btnCreate' title='Criar' onPress={handleSubmit(onSubmit)}/>
      </>}
      data={[]}
      keyExtractor={() => Math.random().toString()}
      renderItem={() => null}
    />
  )
}
