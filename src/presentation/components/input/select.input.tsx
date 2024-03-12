import React, { useEffect } from 'react'
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
  values?: string
}

export default function SelectInput ({ data, origin, setValue, errors, input, values }: Props): React.JSX.Element {
  const filtered = data.filter(item => item.origin === origin)
  const selectedItem = filtered.filter(item => item.name === values)

  useEffect(() => {
    const setPreSelectedItem = async (): Promise<void> => {
      if (values !== undefined) {
        setValue(input, selectedItem[0].id)
      }
    }
    void setPreSelectedItem()
  }, [])

  return (
    <View testID='select'>
      <SelectPicker
        onValueChange={(value: string) => { setValue(input, value) }}
        items={filtered.map(item => ({ label: item.name, value: item.id }))}
        value={values !== undefined ? selectedItem[0].id : undefined}
      />
      {(errors[input] != null) && <Text testID='error-message'>{errors[input]?.message}</Text>}
    </View>
  )
}
