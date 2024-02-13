import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { type IWorkInfo } from '../../../data/protocols/usecases/work.info.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type workProps } from '../../../domain/entities/work'

interface Props {
  getWorkInfo: IWorkInfo
  localStorage: ILocalStorage
}

export default function Home ({ getWorkInfo, localStorage }: Props): React.JSX.Element {
  const [data, setData] = useState<workProps[]>()
  const getTest = async (): Promise<void> => {
    const token = await localStorage.obtain('token')
    if (token != null) {
      const httpRes = await getWorkInfo.perform(token)
      setData(httpRes[0])
    }
  }

  return (
    <View>
      <Text>Hi!, this is home page</Text>
      <Button title='Teste' onPress={async () => { await getTest() }} />
      {data?.map(item => (
        <View key={item.id}>
          <Text>Driver: {item.driver}</Text>
          <Text>Service: {item.service}</Text>
        </View>
      ))}
    </View>
  )
}
