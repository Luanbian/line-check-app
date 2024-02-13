import React from 'react'
import { View, Text, Button } from 'react-native'
import { type IWorkInfo } from '../../../data/protocols/usecases/work.info.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'

interface Props {
  getWorkInfo: IWorkInfo
  localStorage: ILocalStorage
}

export default function Home ({ getWorkInfo, localStorage }: Props): React.JSX.Element {
  const getTest = async (): Promise<void> => {
    const httpRes = await getWorkInfo.perform()
    console.log('tsx: ', httpRes)
  }

  return (
    <View>
      <Text>Hi!, this is home page</Text>
      <Button title='Teste' onPress={async () => { await getTest() }} />
    </View>
  )
}
