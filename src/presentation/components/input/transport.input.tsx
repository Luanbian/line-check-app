import React from 'react'
import { Button, Text, TextInput } from 'react-native'
import { type transport } from '../../../domain/entities/transport'
import { useForm } from 'react-hook-form'
import { type ICreateVehicle } from '../../../data/protocols/create.vehicle.protocol'
import { type ICreateService } from '../../../data/protocols/create.service.protocol'
import { type ICreateManufacture } from '../../../data/protocols/create.manufacture.protocol'
import { type ICreateLogistic } from '../../../data/protocols/logistic.protocol'
import { yupResolver } from '@hookform/resolvers/yup'
import { createTransportValidationSchema } from '../../../validation/create.transport.validation'

interface Props {
  transp: transport
  createVehicle: ICreateVehicle
  createService: ICreateService
  createManufacture: ICreateManufacture
  createLogistic: ICreateLogistic
  token: string
}

interface Inputs {
  value: string
}

export default function TransportInput ({
  transp,
  token,
  createVehicle,
  createService,
  createManufacture,
  createLogistic
}: Props): React.JSX.Element {
  const { setValue, formState: { errors }, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(createTransportValidationSchema)
  })

  const onSubmit = async (data: string, field: transport): Promise<void> => {
    switch (field) {
      case 'vehicle':
        await createVehicle.perform({ vehicle: data }, token)
        break
      case 'logistic':
        await createLogistic.perform({ logistic: data }, token)
        break
      case 'manufacture':
        await createManufacture.perform({ manufacture: data }, token)
        break
      case 'service':
        await createService.perform({ service: data }, token)
    }
  }

  return (
    <>
      <Text testID='title'>Cadastrar {transp}</Text>
      <TextInput
        testID='valueInput'
        placeholder='valor'
        onChangeText={text => { setValue('value', text) }}
      />
      <Button
        testID='submitBtn'
        title='Cadastrar'
        onPress={handleSubmit(async (data) => { await onSubmit(data.value, transp) })}
      />
      {(errors.value != null) && <Text testID='error-message'>{errors.value.message}</Text>}
    </>
  )
}
