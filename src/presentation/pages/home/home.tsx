import React, { useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput } from 'react-native'
import { type IWorkInfo } from '../../../data/protocols/usecases/work.info.protocol'
import { type IinsertKm } from '../../../data/protocols/usecases/insert.km.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type workProps } from '../../../domain/entities/work'
import { type LinecheckOptions, type IUpdateLineCheck } from '../../../data/protocols/usecases/update.linecheck.protocol'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FinalInsertKmValidationSchema, InitInsertKmValidationSchema } from '../../../validation/insert.km.validation'

interface Props {
  getWorkInfo: IWorkInfo
  localStorage: ILocalStorage
  updateLinecheck: IUpdateLineCheck
  insertKm: IinsertKm
}

export default function Home ({ getWorkInfo, localStorage, updateLinecheck, insertKm }: Props): React.JSX.Element {
  const { setValue: setValueInit, handleSubmit: handleSubmitInit, formState: { errors: errInit } } = useForm({
    resolver: yupResolver(InitInsertKmValidationSchema)
  })
  const { setValue: setValueFinal, handleSubmit: handleSubmitFinal, formState: { errors: errFinal } } = useForm({
    resolver: yupResolver(FinalInsertKmValidationSchema)
  })

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

  const handleInitLine = async (id: string, value: number): Promise<void> => {
    await updateDriverLinecheck(id, 'STARTLINEREAL')
    await localStorage.save('initKm', String(value))
  }
  const handleEndLine = async (id: string, value: number): Promise<void> => {
    const [initKm, accountId, token] = await Promise.all([
      localStorage.obtain('initKm'),
      localStorage.obtain('accountId'),
      localStorage.obtain('token')
    ])
    if (initKm === null) {
      setErrorSubmit('Você esqueceu de colocar a quilometragem inicial')
      return
    }
    await updateDriverLinecheck(id, 'ENDLINEREAL')
    if (token != null && accountId != null) {
      await insertKm.perform({
        finalKm: value,
        initialKm: Number(initKm)
      }, id, accountId, token)
      await localStorage.clean()
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
          <TextInput testID='inputInitKm' placeholder='quilômetragem inicial' onChangeText={(value: string) => { setValueInit('init', Number(value)) }}/>
          {errInit.init != null && <Text testID='errInit-message'>{errInit.init.message}</Text>}
          <Button testID='startLineBtn' title='Check start line' onPress={handleSubmitInit(async (data) => { await handleInitLine(item.id, data.init) })} />
          <Text testID='serviceField'>Serviço: {item.service}</Text>
          <Text testID='logisticField'>Logistica: {item.logistic}</Text>
          <Text testID='manufactureField'>Fábrica: {item.manufacture}</Text>
          <Text testID='vehicleField'>Veículo: {item.vehicle}</Text>
          <Text testID='endLineField'>Fim linha: {item.endLineModel}</Text>
          <TextInput testID='inputEndKm' placeholder='quilômetragem final' onChangeText={(value: string) => { setValueFinal('final', Number(value)) }}/>
          {errFinal.final != null && <Text testID='errFinal-message'>{errFinal.final.message}</Text>}
          <Button testID='endLineBtn' title='Check end line' onPress={handleSubmitFinal(async (data) => { await handleEndLine(item.id, data.final) })} />
        </View>
      ))}
    </ScrollView>
  )
}
