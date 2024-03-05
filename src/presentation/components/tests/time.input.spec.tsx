import { type RenderResult, render, fireEvent, waitFor, act } from '@testing-library/react-native'
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
  test('should render the DatePicker when button are pressed', async () => {
    const { sut } = makeSut()
    const selectHourBtn = await sut.getByTestId('selectHourBtn')
    await waitFor(async () => {
      fireEvent.press(selectHourBtn)
      const datepicker = await sut.queryByTestId('datepicker')
      expect(datepicker).toBeDefined()
    })
  })
  test('should confirm selected hour and show in the screen', async () => {
    const { sut, setValueMock, inputMock } = makeSut()
    const selectHourBtn = await sut.getByTestId('selectHourBtn')
    act(() => {
      fireEvent.press(selectHourBtn)
    })
    const datepicker = await sut.findByTestId('picker')
    const selectedHour = new Date('2024-03-05T10:00:00')
    await waitFor(async () => {
      datepicker.props.children[1].props.onConfirm(selectedHour)
      expect(setValueMock).toHaveBeenCalledWith(inputMock, '13:00:00', { shouldValidate: true })
      const hourTxt = await sut.findByTestId('hourTxt')
      expect(hourTxt).toHaveTextContent('13:00:00')
    })
  })
  test('should hide components when confirm selected hour', async () => {
    const { sut } = makeSut()
    const selectHourBtn = await sut.getByTestId('selectHourBtn')
    act(() => {
      fireEvent.press(selectHourBtn)
    })
    const datepicker = await sut.findByTestId('picker')
    await waitFor(async () => {
      datepicker.props.children[1].props.onCancel()
      const picker = await sut.queryByTestId('datepicker')
      expect(picker).toBeNull()
    })
  })
  test('show error message if value is null', async () => {
    const { sut, errorsMock, inputMock, setValueMock } = makeSut()
    errorsMock.startJourney = {
      type: 'required',
      message: 'error message'
    }
    sut.rerender(
      <TimePicker
        errors={errorsMock}
        input={inputMock}
        setValue={setValueMock}
      />
    )
    const errorMessage = sut.queryByTestId('error-message')
    expect(errorMessage).not.toBeNull()
    expect(errorMessage).toHaveTextContent('error message')
  })
})
