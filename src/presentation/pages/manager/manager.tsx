import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type IWorkInfoComplete } from '../../../data/protocols/usecases/work.info.protocol'
import { type workPropsComplete, type workPropsManager } from '../../../domain/entities/work'
import { type EntityNames } from '../../../domain/entities/entity.names'
import { type transport } from '../../../domain/entities/transport'
import { useForm } from 'react-hook-form'

interface NavigationType {
  navigate: (name: string, params?: { data?: EntityNames[], id?: string, values?: workPropsComplete }) => void
}

interface Props {
  localStorage: ILocalStorage
  workInfoComplete: IWorkInfoComplete
}

interface Inputs {
  field: string
}

interface Inputs {
  field: string
}

export default function Manager ({ localStorage, workInfoComplete }: Props): React.JSX.Element {
  const navigation = useNavigation<NavigationType>()
  const [data, setData] = useState<workPropsManager>()
  const { setValue, formState: { errors }, handleSubmit } = useForm<Inputs>()
  const [transp, setTransp] = useState<transport | null>(null)

  useEffect(() => {
    const getWorkDriverCompleteInfo = async (): Promise<void> => {
      const token = await localStorage.obtain('token')
      if (token != null) {
        const httpRes = await workInfoComplete.perform(token)
        setData(httpRes)
      }
    }
    void getWorkDriverCompleteInfo()
  }, [])

  const handleCreateLine = (): void => {
    navigation.navigate('CREATELINE', { data: data?.entities })
  }
  const handleUpdateLine = (item: workPropsComplete): void => {
    navigation.navigate('CREATELINE', { data: data?.entities, id: item.id, values: item })
  }
  const onSubmit = async (data: string, field: transport): Promise<void> => {

  }

  return (
    <ScrollView>
      <Button testID='createLineBtn' title='Criar linha' onPress={handleCreateLine}/>
      <Button title='Cadastrar veiculo' onPress={() => { setTransp('vehicle') }}/>
      <Button title='Cadastrar serviço' onPress={() => { setTransp('service') }}/>
      <Button title='Cadastrar fábrica' onPress={() => { setTransp('manufacture') }}/>
      <Button title='Cadastrar rota' onPress={() => { setTransp('logistic') }}/>
      {transp !== null && (
        <>
          <Text>Cadastrar {transp}</Text>
          <TextInput
            placeholder='valor'
            onChangeText={text => { setValue('field', text) }}
          />
          <Button
            title='Cadastrar'
            onPress={handleSubmit(async (data) => { await onSubmit(data.field, transp) })}
          />
          {(errors.field != null) && <Text>{errors.field.message}</Text>}
        </>
      )}
      {data?.works.map(item => (
        <View testID='card' key={item.id} style={{ borderColor: 'red', borderWidth: 5 }}>
          <Button title='atualizar' onPress={() => { handleUpdateLine(item) }}/>
          <Text testID='driver'>Motorista: {item.accountName}</Text>
          <Text testID='startJourneyModel'>Inicio jornada: {item.startJourneyModel}</Text>
          <Text testID='startJourneyReal'>Inicio jornada real: {item.startJourneyReal}</Text>
          <Text testID='startLineModel'>Inicio linha: {item.startLineModel}</Text>
          <Text testID='startLineReal'>Inicio linha real: {item.startLineReal}</Text>
          <Text testID='service'>Service: {item.service}</Text>
          <Text testID='logistic'>Logistica: {item.logistic}</Text>
          <Text testID='manufacture'>Fábrica: {item.manufacture}</Text>
          <Text testID='vehicle'>Veiculo: {item.vehicle}</Text>
          <Text testID='endLineModel'>Fim jornada: {item.endLineModel}</Text>
          <Text testID='endLineReal'>Fim jornada real: {item.endLineReal}</Text>
          <Text testID='daysOfTheWeek'>Dias da semana: {item.daysOfTheWeek}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
