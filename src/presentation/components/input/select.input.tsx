import React from 'react'
import { Text, View } from 'react-native'
import SelectPicker from 'react-native-picker-select'
import { type EntityNames } from '../../../domain/entities/entity.names'
import { type Inputs } from '../../pages/manager/create.line.form'
import { type FieldErrors, type UseFormSetValue } from 'react-hook-form'

interface Props {
  data: EntityNames[]
  origin: 'accounts' | 'logistics' | 'services' | 'vehicles' | 'manufactures'
  setValue: UseFormSetValue<Inputs>
  errors: FieldErrors<Inputs>
  input: keyof Inputs
}

export default function SelectInput ({ data, origin, setValue, errors, input }: Props): React.JSX.Element {
  return (
    <View testID='select'>
      <SelectPicker
        onValueChange={(value: string) => { setValue(input, value) }}
        items={data.filter(item => item.origin === origin).map(item => ({
          label: item.name, value: item.id
        }))}
      />
      {(errors[input] != null) && <Text testID='error-message'>{errors[input]?.message}</Text>}
    </View>
  )
}
