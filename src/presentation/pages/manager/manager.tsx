import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type IWorkInfoComplete } from '../../../data/protocols/usecases/work.info.protocol'
import { type workPropsComplete, type workPropsManager } from '../../../domain/entities/work'
import { type EntityNames } from '../../../domain/entities/entity.names'
import { type transport } from '../../../domain/entities/transport'
import { type ICreateVehicle } from '../../../data/protocols/usecases/create.vehicle.protocol'
import { type ICreateService } from '../../../data/protocols/usecases/create.service.protocol'
import { type ICreateManufacture } from '../../../data/protocols/usecases/create.manufacture.protocol'
import { type ICreateLogistic } from '../../../data/protocols/usecases/logistic.protocol'
import TransportInput from '../../components/input/transport.input'

interface NavigationType {
  navigate: (name: string, params?: { data?: EntityNames[], id?: string, values?: workPropsComplete }) => void
}

interface Props {
  localStorage: ILocalStorage
  workInfoComplete: IWorkInfoComplete
  createVehicle: ICreateVehicle
  createService: ICreateService
  createManufacture: ICreateManufacture
  createLogistic: ICreateLogistic
}

export default function Manager ({
  localStorage,
  workInfoComplete,
  createVehicle,
  createService,
  createManufacture,
  createLogistic
}: Props): React.JSX.Element {
  const navigation = useNavigation<NavigationType>()
  const [data, setData] = useState<workPropsManager>()
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

  return (
    <ScrollView>
      <Button testID='createLineBtn' title='Criar linha' onPress={handleCreateLine}/>
      <Button title='Cadastrar veiculo' onPress={() => { setTransp('vehicle') }}/>
      <Button title='Cadastrar serviço' onPress={() => { setTransp('service') }}/>
      <Button title='Cadastrar fábrica' onPress={() => { setTransp('manufacture') }}/>
      <Button title='Cadastrar rota' onPress={() => { setTransp('logistic') }}/>
      {transp !== null && (
        <TransportInput
          createLogistic={createLogistic}
          createManufacture={createManufacture}
          createService={createService}
          createVehicle={createVehicle}
          localStorage={localStorage}
          transp={transp}
        />
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
