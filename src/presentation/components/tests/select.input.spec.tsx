import React from 'react'
import { type RenderResult, render } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import SelectInput from '../input/select.input'
import { entityNamesMock } from '../../../data/tests/mocks/entity.names.mock'
import { type EntityNames } from '../../../domain/entities/entity.names'
import { type Inputs } from '../../pages/manager/create.line.form'
import { type FieldErrors, type UseFormSetValue } from 'react-hook-form'

interface SutTypes {
  sut: RenderResult
  dataMock: EntityNames[]
  originMock: 'accounts' | 'logistics' | 'services' | 'vehicles' | 'manufactures'
  setValueMock: UseFormSetValue<Inputs>
  errorsMock: FieldErrors<Inputs>
  inputMock: keyof Inputs
  valuesMock?: string
}

const makeSut = (): SutTypes => {
  const dataMock = [entityNamesMock(), entityNamesMock(), entityNamesMock('logistics')]
  const originMock = 'accounts'
  const setValueMock = jest.fn()
  const errorsMock = {
    account: undefined
  }
  const inputMock = 'account'
  const valuesMock = dataMock[0].name
  const sut = render(
    <SelectInput
      data={dataMock}
      origin={originMock}
      setValue={setValueMock}
      errors={errorsMock}
      input={inputMock}
      values={valuesMock}
    />
  )
  return {
    sut, dataMock, originMock, setValueMock, errorsMock, inputMock, valuesMock
  }
}
describe('SelectInput Component', () => {
  test('first state of component', async () => {
    const { sut } = makeSut()
    const selectCard = sut.findByTestId('select')
    expect(selectCard).toBeDefined()
    const errorMessage = sut.queryByTestId('error-message')
    expect(errorMessage).toBeNull()
  })
  test('should render the SelectPicker component with items filtereds', async () => {
    const { sut } = makeSut()
    const select = await sut.findByTestId('select')
    expect(select.props.children[0]).toBeDefined()
    expect(select.props.children[0].props.items).toHaveLength(2)
  })
  test('should setValue correctly', async () => {
    const { sut, setValueMock, inputMock } = makeSut()
    const select = await sut.findByTestId('select')
    const firstOption = select.props.children[0].props.items[0].value
    select.props.children[0].props.onValueChange(firstOption)
    expect(setValueMock).toHaveBeenCalledWith(inputMock, firstOption)
  })
  test('show error message if value is null', async () => {
    const { sut, errorsMock, dataMock, inputMock, originMock, setValueMock } = makeSut()
    errorsMock.account = {
      type: 'required',
      message: 'error message'
    }
    sut.rerender(
      <SelectInput
        data={dataMock}
        errors={errorsMock}
        input={inputMock}
        origin={originMock}
        setValue={setValueMock}
      />
    )
    const errorMessage = sut.queryByTestId('error-message')
    expect(errorMessage).not.toBeNull()
    expect(errorMessage).toHaveTextContent('error message')
  })
  test('should pre select item if values is defined correctly', async () => {
    const { sut, setValueMock, inputMock, valuesMock, dataMock, originMock } = makeSut()
    const filtered = dataMock.filter(item => item.origin === originMock)
    const selectedItem = filtered.filter(item => item.name === valuesMock)
    expect(setValueMock).toHaveBeenCalledWith(inputMock, selectedItem[0].id)
    const select = await sut.findByTestId('select')
    const option = select.props.children[0].props.items[0].value
    expect(option).toBe(selectedItem[0].id)
  })
})
