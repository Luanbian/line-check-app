import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type IWorkInfoComplete } from '../../../data/protocols/usecases/work.info.protocol'
import { type workPropsComplete } from '../../../domain/entities/work'

interface NavigationType {
  navigate: (name: string, params?: { data: workPropsComplete[] }) => void
}

interface Props {
  localStorage: ILocalStorage
  workInfoComplete: IWorkInfoComplete
}

export default function Manager ({ localStorage, workInfoComplete }: Props): React.JSX.Element {
  const navigation = useNavigation<NavigationType>()
  const [data, setData] = useState<workPropsComplete[]>([])

  useEffect(() => {
    const getWorkDriverCompleteInfo = async (): Promise<void> => {
      const token = await localStorage.obtain('token')
      if (token != null) {
        const httpRes = await workInfoComplete.perform(token)
        setData(httpRes[0])
      }
    }
    void getWorkDriverCompleteInfo()
  }, [])

  const handleCreateLine = (): void => {
    navigation.navigate('CREATELINE', { data })
  }

  return (
    <ScrollView>
      <Button title='Criar linha' onPress={handleCreateLine}/>
      {data?.map(item => (
        <View testID='card' key={item.id} style={{ borderColor: 'red', borderWidth: 5 }}>
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
        </View>
      ))}
    </ScrollView>
  )
}
