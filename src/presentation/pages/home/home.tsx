import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { type IWorkInfo } from '../../../data/protocols/usecases/work.info.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type workProps } from '../../../domain/entities/work'
import { type IUpdateLineCheck } from '../../../data/protocols/usecases/update.linecheck.protocol'

interface Props {
  getWorkInfo: IWorkInfo
  localStorage: ILocalStorage
  updateLinecheck: IUpdateLineCheck
}

export default function Home ({ getWorkInfo, localStorage, updateLinecheck }: Props): React.JSX.Element {
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
          <Text>Driver: {item.accountName}</Text>
          <Text>Service: {item.service}</Text>
          <Text>days of the week: {item.daysOfTheWeek.join(', ')}</Text>
        </View>
      ))}
    </View>
  )
}
