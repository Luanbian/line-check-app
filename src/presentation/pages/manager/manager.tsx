import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type IWorkInfoComplete } from '../../../data/protocols/usecases/work.info.protocol'
import { type workPropsComplete } from '../../../domain/entities/work'

interface Props {
  localStorage: ILocalStorage
  workInfoComplete: IWorkInfoComplete
}

export default function Manager ({ localStorage, workInfoComplete }: Props): React.JSX.Element {
  const [data, setData] = useState<workPropsComplete[]>()

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

  return (
    <ScrollView>
      {data?.map(item => (
        <View key={item.id}>
          <Text>Driver: {item.accountName}</Text>
          <Text>Service: {item.service}</Text>
          <Text>inicio jornada: {item.startJourneyModel}</Text>
          <Text>inicio jornada real: {item.startJourneyReal}</Text>
          <Text>fim jornada real: {item.endLineReal}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
