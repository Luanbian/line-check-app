import React from 'react'
import { type RenderResult, render, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import Manager, { type ParamList } from '../manager/manager'
import { makeWorkInfoCompleteMock } from '../../../data/tests/mocks/work.info.complete.mock'
import { type IWorkInfoComplete } from '../../../data/protocols/work.info.protocol'
import { type RouteProp } from '@react-navigation/native'
import { makeCreateLogisticMock } from '../../../data/tests/mocks/create.logistic.mock'
import { makeCreateManufactureMock } from '../../../data/tests/mocks/create.manufacture.mock'
import { makeCreateServiceMock } from '../../../data/tests/mocks/create.service.mock'
import { makeCreateVehicleMock } from '../../../data/tests/mocks/create.vehicle.mock'
import { type ICreateLogistic } from '../../../data/protocols/logistic.protocol'
import { type ICreateManufacture } from '../../../data/protocols/create.manufacture.protocol'
import { type ICreateService } from '../../../data/protocols/create.service.protocol'
import { type ICreateVehicle } from '../../../data/protocols/create.vehicle.protocol'

interface SutTypes {
  sut: RenderResult
  workInfoCompleteMock: IWorkInfoComplete
  routeMock: RouteProp<ParamList, 'MANAGER'>
  createLogisticMock: ICreateLogistic
  createManufactureMock: ICreateManufacture
  createServiceMock: ICreateService
  createVehicleMock: ICreateVehicle
}

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() })
}))

const makeSut = (): SutTypes => {
  const workInfoCompleteMock = makeWorkInfoCompleteMock()
  const createLogisticMock = makeCreateLogisticMock()
  const createManufactureMock = makeCreateManufactureMock()
  const createServiceMock = makeCreateServiceMock()
  const createVehicleMock = makeCreateVehicleMock()
  const routeMock: RouteProp<ParamList, 'MANAGER'> = {
    key: 'any_unique_id',
    name: 'MANAGER',
    params: {
      accountId: 'fake_account_id',
      token: 'fake_token'
    }
  }
  const sut = render(
    <Manager
      workInfoComplete={workInfoCompleteMock}
      createLogistic={createLogisticMock}
      createManufacture={createManufactureMock}
      createService={createServiceMock}
      createVehicle={createVehicleMock}
      route={routeMock}
    />
  )
  return {
    sut,
    workInfoCompleteMock,
    routeMock,
    createLogisticMock,
    createManufactureMock,
    createServiceMock,
    createVehicleMock
  }
}
describe('manager page', () => {
  test('ensure the api are called when component is mounted', async () => {
    const {
      createLogisticMock,
      createManufactureMock,
      createServiceMock,
      createVehicleMock,
      routeMock,
      workInfoCompleteMock
    } = makeSut()
    const { token } = routeMock.params
    const getWorkSpy = jest.spyOn(workInfoCompleteMock, 'perform')
    render(
      <Manager
        createLogistic={createLogisticMock}
        createManufacture={createManufactureMock}
        createService={createServiceMock}
        createVehicle={createVehicleMock}
        route={routeMock}
        workInfoComplete={workInfoCompleteMock}
      />
    )
    await waitFor(() => {
      expect(getWorkSpy).toHaveBeenCalledWith(token)
    })
  })
  test('first state of screen after get info from API', async () => {
    const { sut } = makeSut()
    const createLineBtn = await sut.findByTestId('createLineBtn')
    expect(createLineBtn).toHaveTextContent('Criar linha')
    const card = await sut.findByTestId('card')
    expect(card).toBeDefined()
    const driver = await sut.findByTestId('driver')
    expect(driver).toHaveTextContent('Motorista: any_valid_name')
    const startJourneyModel = await sut.findByTestId('startJourneyModel')
    expect(startJourneyModel).toHaveTextContent('Inicio jornada: fake_time 05:00:00')
    const startJourneyReal = await sut.findByTestId('startJourneyReal')
    expect(startJourneyReal).toHaveTextContent('Inicio jornada real: any_valid_timestamp 2024-01-01 05:05:10')
    const startLineModel = await sut.findByTestId('startLineModel')
    expect(startLineModel).toHaveTextContent('Inicio linha: fake_time 05:30:00')
    const startLineReal = await sut.findByTestId('startLineReal')
    expect(startLineReal).toHaveTextContent('Inicio linha real: any_valid_timestamp 2024-01-01 05:35:35')
    const service = await sut.findByTestId('service')
    expect(service).toHaveTextContent('Service: any_valid_service')
    const logistic = await sut.findByTestId('logistic')
    expect(logistic).toHaveTextContent('Logistica: any_valid_location')
    const manufacture = await sut.findByTestId('manufacture')
    expect(manufacture).toHaveTextContent('Fábrica: any_valid_manufacture')
    const vehicle = await sut.findByTestId('vehicle')
    expect(vehicle).toHaveTextContent('Veiculo: any_valid_vehicle')
    const endLineModel = await sut.findByTestId('endLineModel')
    expect(endLineModel).toHaveTextContent('Fim jornada: fake_time 09:00:00')
    const endLineReal = await sut.findByTestId('endLineReal')
    expect(endLineReal).toHaveTextContent('Fim jornada real: any_valid_timestamp 2024-01-01 09:15:12')
    const daysOfTheWeek = await sut.findByTestId('daysOfTheWeek')
    expect(daysOfTheWeek).toHaveTextContent('Dias da semana: aaaabbbbccccc')
  })
})
