import { type RenderResult, render } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import React from 'react'
import TimePicker from '../input/time.input'
import { type Inputs } from '../../pages/manager/create.line.form'
import { type UseFormSetValue, type FieldErrors } from 'react-hook-form'

interface SutTypes {
  sut: RenderResult
  inputMock: keyof Inputs
  errorsMock: FieldErrors<Inputs>
  setValueMock: UseFormSetValue<Inputs>
}

const makeSut = (): SutTypes => {
  const inputMock = 'startJourney'
  const errorsMock = {
    startJourney: undefined
  }
  const setValueMock = jest.fn()
  const sut = render(
    <TimePicker
      input={inputMock}
      errors={errorsMock}
      setValue={setValueMock}
    />
  )
  return {
    sut, inputMock, errorsMock, setValueMock
  }
}

describe('TimePicker Component', () => {
  test('first state of component', async () => {
    const { sut } = makeSut()
    const picker = await sut.findByTestId('picker')
    expect(picker).toBeDefined()
    const selectHourBtn = await sut.findByTestId('selectHourBtn')
    expect(selectHourBtn).toHaveTextContent('Selecionar horário')
    const datepicker = await sut.queryByTestId('datepicker')
    expect(datepicker).toBeNull()
    const hourTxt = await sut.findByTestId('hourTxt')
    expect(hourTxt).toHaveTextContent('')
    const errorMessage = await sut.queryByTestId('error-message')
    expect(errorMessage).toBeNull()
  })
})
