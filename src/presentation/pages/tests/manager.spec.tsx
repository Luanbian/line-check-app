import React from 'react'
import { type RenderResult, render, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import Manager from '../manager/manager'
import { makeLocalStorageMock } from '../../../infra/tests/mocks/local.storage.mock'
import { makeWorkInfoCompleteMock } from '../../../data/tests/mocks/work.info.complete.mock'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type IWorkInfoComplete } from '../../../data/protocols/usecases/work.info.protocol'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: RenderResult
  localStorageMock: ILocalStorage
  workInfoCompleteMock: IWorkInfoComplete
}

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() })
}))

const makeSut = (): SutTypes => {
  const localStorageMock = makeLocalStorageMock()
  const workInfoCompleteMock = makeWorkInfoCompleteMock()
  const sut = render(
    <Manager
      localStorage={localStorageMock}
      workInfoComplete={workInfoCompleteMock}
    />
  )
  return {
    sut, localStorageMock, workInfoCompleteMock
  }
}
describe('manager page', () => {
  test('ensure the api are called when component is mounted', async () => {
    const { localStorageMock, workInfoCompleteMock } = makeSut()
    const fakeToken = faker.string.uuid()
    const workPropsStub = makeWorkInfoCompleteMock().perform(fakeToken)
    jest.spyOn(localStorageMock, 'obtain').mockResolvedValue(fakeToken)
    jest.spyOn(workInfoCompleteMock, 'perform').mockResolvedValue(workPropsStub)
    render(
      <Manager
        localStorage={localStorageMock}
        workInfoComplete={workInfoCompleteMock}
      />
    )
    await waitFor(() => {
      expect(localStorageMock.obtain).toHaveBeenCalledWith('token')
      expect(workInfoCompleteMock.perform).toHaveBeenCalledWith(fakeToken)
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
  })
})
