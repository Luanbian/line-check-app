import React, { useEffect, useState } from 'react'
import { type UseFormSetValue, type FieldErrors } from 'react-hook-form'
import { Button, Text, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { type Inputs } from '../../pages/manager/create.line.form'

interface Props {
  input: keyof Inputs
  errors: FieldErrors<Inputs>
  setValue: UseFormSetValue<Inputs>
  values?: string
}

export default function TimePicker ({ input, errors, setValue, values }: Props): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)
  const [inputHour, setInputHour] = useState('')

  useEffect(() => {
    const setDefaultDatePicker = (): void => {
      if (typeof values === 'string') setValue(input, values)
    }
    setDefaultDatePicker()
  }, [])

  const handleConfirmHours = (date: Date): void => {
    const newInputHour = date.toISOString().substring(11, 19)
    setInputHour(newInputHour)
    setValue(input, newInputHour)
    setIsVisible(false)
  }

  return (
    <View testID='picker'>
      <Button testID='selectHourBtn' title='Selecionar horário' onPress={() => { setIsVisible(true) }}/>
      <DateTimePicker
        testID='datepicker'
        isVisible={isVisible}
        mode='time'
        is24Hour
        date={values === undefined ? new Date() : new Date(`2024-03-05T${values}`)}
        onConfirm={handleConfirmHours}
        onCancel={() => { setIsVisible(false) }}
      />
      <Text testID='hourTxt'>{values ?? inputHour}</Text>
      {(errors[input] != null) && <Text testID='error-message'>{errors[input]?.message}</Text>}
    </View>
  )
}
