import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { type IWorkInfo } from '../../../data/protocols/usecases/work.info.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type workProps } from '../../../domain/entities/work'
import { type LinecheckOptions, type IUpdateLineCheck } from '../../../data/protocols/usecases/update.linecheck.protocol'

interface Props {
  getWorkInfo: IWorkInfo
  localStorage: ILocalStorage
  updateLinecheck: IUpdateLineCheck
}

export default function Home ({ getWorkInfo, localStorage, updateLinecheck }: Props): React.JSX.Element {
  const [data, setData] = useState<workProps[]>()
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null)

  const getTest = async (): Promise<void> => {
    const token = await localStorage.obtain('token')
    if (token != null) {
      const httpRes = await getWorkInfo.perform(token)
      setData(httpRes[0])
    }
  }

  const putTest = async (workId: string, marker: LinecheckOptions): Promise<void> => {
    try {
      const token = await localStorage.obtain('token')
      const accountId = await localStorage.obtain('accountId')
      if (token != null && accountId != null) {
        await updateLinecheck.perform({
          workId,
          accountId,
          marker,
          token
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorSubmit(error.message)
      }
    }
  }

  return (
    <View>
      <Text>Hi!, this is home page</Text>
      {(errorSubmit != null) && <Text>{errorSubmit}</Text>}
      <Button title='Teste' onPress={async () => { await getTest() }} />
      {data?.map(item => (
        <View key={item.id}>
          <Text>Driver: {item.accountName}</Text>
          <Text>Service: {item.service}</Text>
          <Text>inicio jornada: {item.startJourneyModel}</Text>
          <Button title='Check start journey' onPress={async () => { await putTest(item.id, 'STARTJOURNEYREAL') }} />
          <Button title='Check start line' onPress={async () => { await putTest(item.id, 'STARTLINEREAL') }} />
          <Button title='Check end journey' onPress={async () => { await putTest(item.id, 'ENDLINEREAL') }} />
        </View>
      ))}
    </View>
  )
}
