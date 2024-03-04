import React from 'react'
import { type RenderResult, render } from '@testing-library/react-native'
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
}

const makeSut = (): SutTypes => {
  const dataMock = [entityNamesMock()]
  const originMock = 'accounts'
  const setValueMock = jest.fn()
  const errorsMock = {
    account: undefined
  }
  const inputMock = 'account'
  const sut = render(
    <SelectInput
      data={dataMock}
      origin={originMock}
      setValue={setValueMock}
      errors={errorsMock}
      input={inputMock}
    />
  )
  return {
    sut, dataMock, originMock, setValueMock, errorsMock, inputMock
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
})
