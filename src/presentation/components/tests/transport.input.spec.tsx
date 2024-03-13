import React from 'react'
import { type RenderResult, render, fireEvent, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import TransportInput from '../input/transport.input'
import { makeCreateLogisticMock } from '../../../data/tests/mocks/create.logistic.mock'
import { makeCreateManufactureMock } from '../../../data/tests/mocks/create.manufacture.mock'
import { makeCreateServiceMock } from '../../../data/tests/mocks/create.service.mock'
import { makeCreateVehicleMock } from '../../../data/tests/mocks/create.vehicle.mock'
import { makeLocalStorageMock } from '../../../infra/tests/mocks/local.storage.mock'
import { type ICreateLogistic } from '../../../data/protocols/logistic.protocol'
import { type ICreateManufacture } from '../../../data/protocols/create.manufacture.protocol'
import { type ICreateService } from '../../../data/protocols/create.service.protocol'
import { type ICreateVehicle } from '../../../data/protocols/create.vehicle.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type transport } from '../../../domain/entities/transport'

interface SutTypes {
  sut: RenderResult
  createLogisticMock: ICreateLogistic
  createManufactureMock: ICreateManufacture
  createServiceMock: ICreateService
  createVehicleMock: ICreateVehicle
  localStorageMock: ILocalStorage
  transpMock: transport
}

const makeSut = (): SutTypes => {
  const createLogisticMock = makeCreateLogisticMock()
  const createManufactureMock = makeCreateManufactureMock()
  const createServiceMock = makeCreateServiceMock()
  const createVehicleMock = makeCreateVehicleMock()
  const localStorageMock = makeLocalStorageMock()
  const transpMock = 'logistic'
  const sut = render(
    <TransportInput
      createLogistic={createLogisticMock}
      createManufacture={createManufactureMock}
      createService={createServiceMock}
      createVehicle={createVehicleMock}
      localStorage={localStorageMock}
      transp={transpMock}
    />
  )
  return {
    sut, createLogisticMock, createManufactureMock, createServiceMock, createVehicleMock, localStorageMock, transpMock
  }
}
describe('TransportInput', () => {
  test('first state of component', async () => {
    const { sut, transpMock } = makeSut()
    const title = await sut.getByTestId('title')
    expect(title).toHaveTextContent(`Cadastrar ${transpMock}`)
    const valueInput = await sut.findByTestId('valueInput')
    expect(valueInput).toBeDefined()
    const submitBtn = await sut.findByTestId('submitBtn')
    expect(submitBtn).toBeDefined()
    const errorMessage = await sut.queryByTestId('error-message')
    expect(errorMessage).toBeNull()
  })
  test('should call local storage correctly', async () => {
    const { sut, localStorageMock } = makeSut()
    const localStorageSpy = jest.spyOn(localStorageMock, 'obtain')
    const valueInput = await sut.getByTestId('valueInput')
    const submitBtn = await sut.getByTestId('submitBtn')
    await waitFor(() => {
      fireEvent.changeText(valueInput, 'any_value')
      fireEvent.press(submitBtn)
      expect(localStorageSpy).toHaveBeenCalledWith('token')
    })
  })
  test('should call create case based in field provided', async () => {
    const { sut, localStorageMock, createLogisticMock } = makeSut()
    const token = 'fake_token'
    jest.spyOn(localStorageMock, 'obtain').mockImplementationOnce(async () => {
      return token
    })
    const create = jest.spyOn(createLogisticMock, 'perform')
    const valueInput = await sut.getByTestId('valueInput')
    const submitBtn = await sut.getByTestId('submitBtn')
    const value = 'any_value'
    await waitFor(() => {
      fireEvent.changeText(valueInput, value)
      fireEvent.press(submitBtn)
      expect(create).toHaveBeenCalledWith({ logistic: value }, token)
    })
  })
  test('should show error message if value is invalid', async () => {
    const { sut } = makeSut()
    const valueInput = await sut.getByTestId('valueInput')
    const submitBtn = await sut.getByTestId('submitBtn')
    const value = null
    await waitFor(async () => {
      const errorMessage = await sut.queryByTestId('error-message')
      fireEvent.changeText(valueInput, value)
      fireEvent.press(submitBtn)
      expect(errorMessage).toHaveTextContent('O valor é obrigatório')
    })
  })
  test('should not call create if token is null', async () => {
    const { sut, localStorageMock, createLogisticMock } = makeSut()
    jest.spyOn(localStorageMock, 'obtain').mockImplementationOnce(async () => {
      return null
    })
    const create = jest.spyOn(createLogisticMock, 'perform')
    const valueInput = await sut.getByTestId('valueInput')
    const submitBtn = await sut.getByTestId('submitBtn')
    const value = 'any_value'
    await waitFor(async () => {
      fireEvent.changeText(valueInput, value)
      fireEvent.press(submitBtn)
      expect(create).toHaveBeenCalledTimes(0)
    })
  })
})
