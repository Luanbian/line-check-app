import React from 'react'
import { type RenderResult, render, fireEvent, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import TransportInput from '../input/transport.input'
import { makeCreateLogisticMock } from '../../../data/tests/mocks/create.logistic.mock'
import { makeCreateManufactureMock } from '../../../data/tests/mocks/create.manufacture.mock'
import { makeCreateServiceMock } from '../../../data/tests/mocks/create.service.mock'
import { makeCreateVehicleMock } from '../../../data/tests/mocks/create.vehicle.mock'
import { type ICreateLogistic } from '../../../data/protocols/logistic.protocol'
import { type ICreateManufacture } from '../../../data/protocols/create.manufacture.protocol'
import { type ICreateService } from '../../../data/protocols/create.service.protocol'
import { type ICreateVehicle } from '../../../data/protocols/create.vehicle.protocol'
import { type transport } from '../../../domain/entities/transport'

interface SutTypes {
  sut: RenderResult
  createLogisticMock: ICreateLogistic
  createManufactureMock: ICreateManufacture
  createServiceMock: ICreateService
  createVehicleMock: ICreateVehicle
  transpMock: transport
  tokenMock: string
}

const makeSut = (): SutTypes => {
  const createLogisticMock = makeCreateLogisticMock()
  const createManufactureMock = makeCreateManufactureMock()
  const createServiceMock = makeCreateServiceMock()
  const createVehicleMock = makeCreateVehicleMock()
  const transpMock = 'logistic'
  const tokenMock = 'fake_token'
  const sut = render(
    <TransportInput
      createLogistic={createLogisticMock}
      createManufacture={createManufactureMock}
      createService={createServiceMock}
      createVehicle={createVehicleMock}
      transp={transpMock}
      token={tokenMock}
    />
  )
  return {
    sut,
    createLogisticMock,
    createManufactureMock,
    createServiceMock,
    createVehicleMock,
    transpMock,
    tokenMock
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
  test('should call create case based in field provided', async () => {
    const { sut, createLogisticMock, tokenMock } = makeSut()
    const create = jest.spyOn(createLogisticMock, 'perform')
    const valueInput = await sut.getByTestId('valueInput')
    const submitBtn = await sut.getByTestId('submitBtn')
    const value = 'any_value'
    await waitFor(() => {
      fireEvent.changeText(valueInput, value)
      fireEvent.press(submitBtn)
      expect(create).toHaveBeenCalledWith({ logistic: value }, tokenMock)
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
})
