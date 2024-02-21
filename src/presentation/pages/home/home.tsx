import React, { useEffect, useState } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
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

  useEffect(() => {
    const getWorkDriverInfo = async (): Promise<void> => {
      const token = await localStorage.obtain('token')
      if (token != null) {
        const httpRes = await getWorkInfo.perform(token)
        setData(httpRes[0])
      }
    }
    void getWorkDriverInfo()
  }, [])

  const updateDriverLinecheck = async (workId: string, marker: LinecheckOptions): Promise<void> => {
    try {
      const [token, accountId] = await Promise.all([
        localStorage.obtain('token'),
        localStorage.obtain('accountId')
      ])
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
    <ScrollView>
      {(errorSubmit != null) && <Text testID='errorSubmit'>{errorSubmit}</Text>}
      {data?.map(item => (
        <View testID='cardview' key={item.id} style={{ borderColor: 'red', borderWidth: 5 }}>
          <Text testID='driverField'>Motorista: {item.accountName}</Text>
          <Text testID='startJourneyField'>Inicio jornada: {item.startJourneyModel}</Text>
          <Button testID='startJourneyBtn' title='Check start journey' onPress={async () => { await updateDriverLinecheck(item.id, 'STARTJOURNEYREAL') }} />
          <Text testID='startLineField'>Inicio linha: {item.startLineModel}</Text>
          <Button testID='startLineBtn' title='Check start line' onPress={async () => { await updateDriverLinecheck(item.id, 'STARTLINEREAL') }} />
          <Text testID='serviceField'>Serviço: {item.service}</Text>
          <Text testID='logisticField'>Logistica: {item.logistic}</Text>
          <Text testID='manufactureField'>Fábrica: {item.manufacture}</Text>
          <Text testID='vehicleField'>Veículo: {item.vehicle}</Text>
          <Text testID='endLineField'>Fim linha: {item.endLineModel}</Text>
          <Button testID='endLineBtn' title='Check end line' onPress={async () => { await updateDriverLinecheck(item.id, 'ENDLINEREAL') }} />
        </View>
      ))}
    </ScrollView>
  )
}
