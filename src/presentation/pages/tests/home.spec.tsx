import { type RenderResult, render, waitFor, fireEvent } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import React from 'react'
import Home from '../home/home'
import { makeWorkInfoMock } from '../../../data/tests/mocks/work.info.mock'
import { makeLocalStorageMock } from '../../../infra/tests/mocks/local.storage.mock'
import { makeUpdateLinecheckMock } from '../../../data/tests/mocks/update.linecheck.mock'
import { type IWorkInfo } from '../../../data/protocols/usecases/work.info.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type IUpdateLineCheck } from '../../../data/protocols/usecases/update.linecheck.protocol'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: RenderResult
  getWorkInfoMock: IWorkInfo
  localStorageMock: ILocalStorage
  updateLinecheckMock: IUpdateLineCheck
}

const makeSut = (): SutTypes => {
  const getWorkInfoMock = makeWorkInfoMock()
  const localStorageMock = makeLocalStorageMock()
  const updateLinecheckMock = makeUpdateLinecheckMock()
  const sut = render(
    <Home
      getWorkInfo={getWorkInfoMock}
      localStorage={localStorageMock}
      updateLinecheck={updateLinecheckMock}
    />
  )
  return {
    sut, getWorkInfoMock, localStorageMock, updateLinecheckMock
  }
}
describe('home page', () => {
  test('ensure the api are called when component is mounted', async () => {
    const { localStorageMock, getWorkInfoMock, updateLinecheckMock } = makeSut()
    const fakeToken = faker.string.uuid()
    const workPropsStub = makeWorkInfoMock().perform(fakeToken)
    jest.spyOn(localStorageMock, 'obtain').mockResolvedValue(fakeToken)
    jest.spyOn(getWorkInfoMock, 'perform').mockResolvedValue(workPropsStub)
    render(
      <Home
        getWorkInfo={getWorkInfoMock}
        localStorage={localStorageMock}
        updateLinecheck={updateLinecheckMock}
      />
    )
    await waitFor(() => {
      expect(localStorageMock.obtain).toHaveBeenCalledWith('token')
      expect(getWorkInfoMock.perform).toHaveBeenCalledWith(fakeToken)
    })
  })
  test('first state of screen after get info from API', async () => {
    const { sut } = makeSut()
    const card = await sut.findByTestId('cardview')
    expect(card).toBeDefined()
    const errorSubmit = await sut.queryByTestId('errorSubmit')
    expect(errorSubmit).toBe(null)
    const driverField = await sut.findByTestId('driverField')
    expect(driverField).toHaveTextContent('Motorista: any_valid_name')
    const initJourneyField = await sut.findByTestId('initJourneyField')
    expect(initJourneyField).toHaveTextContent('inicio jornada: fake_time 05:00:00')
    const startJourneyBtn = await sut.findByTestId('startJourneyBtn')
    expect(startJourneyBtn).toHaveTextContent('Check start journey')
    const initLineField = await sut.findByTestId('initLineField')
    expect(initLineField).toHaveTextContent('fake_time 05:30:00')
    const initLineBtn = await sut.findByTestId('initLineBtn')
    expect(initLineBtn).toHaveTextContent('Check start line')
    const serviceField = await sut.findByTestId('serviceField')
    expect(serviceField).toHaveTextContent('any_valid_service')
    const logisticField = await sut.findByTestId('logisticField')
    expect(logisticField).toHaveTextContent('any_valid_location')
    const manufactureField = await sut.findByTestId('manufactureField')
    expect(manufactureField).toHaveTextContent('any_valid_manufacture')
    const vehicleField = await sut.findByTestId('vehicleField')
    expect(vehicleField).toHaveTextContent('any_valid_vehicle')
    const endJourneyField = await sut.findByTestId('endJourneyField')
    expect(endJourneyField).toHaveTextContent('fake_time 09:00:00')
    const endJourneyBtn = await sut.findByTestId('endJourneyBtn')
    expect(endJourneyBtn).toHaveTextContent('Check end journey')
  })
  test('should call updateLinecheck use case with correct start journey value', async () => {
    const { sut, updateLinecheckMock, localStorageMock } = makeSut()
    jest.spyOn(localStorageMock, 'obtain').mockResolvedValue('AccountIdOrToken')
    const updateLinecheckSpy = jest.spyOn(updateLinecheckMock, 'perform')
    const startJourneyBtn = await sut.findByTestId('startJourneyBtn')
    await waitFor(() => {
      fireEvent.press(startJourneyBtn)
      expect(updateLinecheckSpy).toHaveBeenCalledWith({
        workId: 'fake_id',
        accountId: 'AccountIdOrToken',
        marker: 'STARTJOURNEYREAL',
        token: 'AccountIdOrToken'
      })
    })
  })
  test('should call updateLinecheck use case with correct start line value', async () => {
    const { sut, updateLinecheckMock, localStorageMock } = makeSut()
    jest.spyOn(localStorageMock, 'obtain').mockResolvedValue('AccountIdOrToken')
    const updateLinecheckSpy = jest.spyOn(updateLinecheckMock, 'perform')
    const initLineBtn = await sut.findByTestId('initLineBtn')
    await waitFor(() => {
      fireEvent.press(initLineBtn)
      expect(updateLinecheckSpy).toHaveBeenCalledWith({
        workId: 'fake_id',
        accountId: 'AccountIdOrToken',
        marker: 'STARTLINEREAL',
        token: 'AccountIdOrToken'
      })
    })
  })
  test('should call updateLinecheck use case with correct end journey value', async () => {
    const { sut, updateLinecheckMock, localStorageMock } = makeSut()
    jest.spyOn(localStorageMock, 'obtain').mockResolvedValue('AccountIdOrToken')
    const updateLinecheckSpy = jest.spyOn(updateLinecheckMock, 'perform')
    const endJourneyBtn = await sut.findByTestId('endJourneyBtn')
    await waitFor(() => {
      fireEvent.press(endJourneyBtn)
      expect(updateLinecheckSpy).toHaveBeenCalledWith({
        workId: 'fake_id',
        accountId: 'AccountIdOrToken',
        marker: 'ENDLINEREAL',
        token: 'AccountIdOrToken'
      })
    })
  })
})
