import React, { useState } from 'react'
import { type UseFormSetValue, type FieldErrors } from 'react-hook-form'
import { Button, Text } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { type Inputs } from '../../pages/manager/create.line.form'

interface Props {
  input: keyof Inputs
  errors: FieldErrors<Inputs>
  setValue: UseFormSetValue<Inputs>
}

export default function TimePicker ({ input, errors, setValue }: Props): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)
  const [inputHour, setInputHour] = useState('')

  const handleConfirmStartLineHours = (date: Date): void => {
    setInputHour(date.toISOString().substring(11, 19))
    setValue(input, inputHour)
    setIsVisible(false)
  }

  return (
    <>
     <Button title='Selecionar horário' onPress={() => { setIsVisible(true) }}/>
        <DateTimePicker
          isVisible={isVisible}
          mode='time'
          is24Hour
          date={new Date()}
          onConfirm={handleConfirmStartLineHours}
          onCancel={() => { setIsVisible(false) }}
        />
        <Text>{inputHour}</Text>
        {(errors[input] != null) && <Text>{errors[input]?.message}</Text>}
    </>
  )
}
