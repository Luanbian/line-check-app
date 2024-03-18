import { type RenderResult, render, waitFor, fireEvent } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import React from 'react'
import Home from '../home/home'
import { makeWorkInfoMock } from '../../../data/tests/mocks/work.info.mock'
import { makeLocalStorageMock } from '../../../infra/tests/mocks/local.storage.mock'
import { makeUpdateLinecheckMock } from '../../../data/tests/mocks/update.linecheck.mock'
import { type IWorkInfo } from '../../../data/protocols/work.info.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'
import { type IUpdateLineCheck } from '../../../data/protocols/update.linecheck.protocol'
import { makeInsertKmMock } from '../../../data/tests/mocks/insert.km.mock'
import { type IinsertKm } from '../../../data/protocols/insert.km.protocol'

interface SutTypes {
  sut: RenderResult
  getWorkInfoMock: IWorkInfo
  localStorageMock: ILocalStorage
  updateLinecheckMock: IUpdateLineCheck
  insertKmMock: IinsertKm
}

const makeSut = (): SutTypes => {
  const getWorkInfoMock = makeWorkInfoMock()
  const localStorageMock = makeLocalStorageMock()
  const updateLinecheckMock = makeUpdateLinecheckMock()
  const insertKmMock = makeInsertKmMock()
  const sut = render(
    <Home
      getWorkInfo={getWorkInfoMock}
      localStorage={localStorageMock}
      updateLinecheck={updateLinecheckMock}
      insertKm={insertKmMock}
    />
  )
  return {
    sut, getWorkInfoMock, localStorageMock, updateLinecheckMock, insertKmMock
  }
}

describe('home page', () => {
  test('ensure the api are called when component is mounted', async () => {
    const { getWorkInfoMock, localStorageMock, updateLinecheckMock, insertKmMock } = makeSut()
    const getWorkSpy = jest.spyOn(getWorkInfoMock, 'perform')
    render(
      <Home
        getWorkInfo={getWorkInfoMock}
        localStorage={localStorageMock}
        updateLinecheck={updateLinecheckMock}
        insertKm={insertKmMock}
      />
    )
    await waitFor(() => {
      expect(getWorkSpy).toHaveBeenCalled()
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
    const startJourneyField = await sut.findByTestId('startJourneyField')
    expect(startJourneyField).toHaveTextContent('Inicio jornada: fake_time 05:00:00')
    const startJourneyBtn = await sut.findByTestId('startJourneyBtn')
    expect(startJourneyBtn).toHaveTextContent('Check start journey')
    const startLineField = await sut.findByTestId('startLineField')
    expect(startLineField).toHaveTextContent('Inicio linha: fake_time 05:30:00')
    const inputInitKm = await sut.findByTestId('inputInitKm')
    expect(inputInitKm).toBeDefined()
    const errInitMessage = await sut.queryByTestId('errInit-message')
    expect(errInitMessage).toBeNull()
    const startLineBtn = await sut.findByTestId('startLineBtn')
    expect(startLineBtn).toHaveTextContent('Check start line')
    const serviceField = await sut.findByTestId('serviceField')
    expect(serviceField).toHaveTextContent('any_valid_service')
    const logisticField = await sut.findByTestId('logisticField')
    expect(logisticField).toHaveTextContent('any_valid_location')
    const manufactureField = await sut.findByTestId('manufactureField')
    expect(manufactureField).toHaveTextContent('any_valid_manufacture')
    const vehicleField = await sut.findByTestId('vehicleField')
    expect(vehicleField).toHaveTextContent('any_valid_vehicle')
    const endLineField = await sut.findByTestId('endLineField')
    expect(endLineField).toHaveTextContent('Fim linha: fake_time 09:00:00')
    const inputEndKm = await sut.findByTestId('inputEndKm')
    expect(inputEndKm).toBeDefined()
    const errFinalMessage = await sut.queryByTestId('errFinal-message')
    expect(errFinalMessage).toBeNull()
    const endLineBtn = await sut.findByTestId('endLineBtn')
    expect(endLineBtn).toHaveTextContent('Check end line')
  })
  test('should call updateLinecheck service with correct start journey value', async () => {
    const { sut, updateLinecheckMock } = makeSut()
    const updateLinecheckSpy = jest.spyOn(updateLinecheckMock, 'perform')
    const startJourneyBtn = await sut.findByTestId('startJourneyBtn')
    await waitFor(() => {
      fireEvent.press(startJourneyBtn)
      expect(updateLinecheckSpy).toHaveBeenCalledWith({
        workId: 'fake_id',
        accountId: '',
        marker: 'STARTJOURNEYREAL',
        token: ''
      })
    })
  })
  test('should call updateLinecheck service with correct start line value', async () => {
    const { sut, updateLinecheckMock } = makeSut()
    const updateLinecheckSpy = jest.spyOn(updateLinecheckMock, 'perform')
    const startLineBtn = await sut.findByTestId('startLineBtn')
    const inputInitKm = await sut.findByTestId('inputInitKm')
    await waitFor(() => {
      fireEvent.changeText(inputInitKm, 100)
      fireEvent.press(startLineBtn)
      expect(updateLinecheckSpy).toHaveBeenCalledWith({
        workId: 'fake_id',
        accountId: '',
        marker: 'STARTLINEREAL',
        token: ''
      })
    })
  })
  test('should call updateLinecheck service with correct end journey value', async () => {
    const { sut, updateLinecheckMock } = makeSut()
    const updateLinecheckSpy = jest.spyOn(updateLinecheckMock, 'perform')
    const endLineBtn = await sut.findByTestId('endLineBtn')
    const inputEndKm = await sut.findByTestId('inputEndKm')
    await waitFor(() => {
      fireEvent.changeText(inputEndKm, 200)
      fireEvent.press(endLineBtn)
      expect(updateLinecheckSpy).toHaveBeenCalledWith({
        workId: 'fake_id',
        accountId: '',
        marker: 'ENDLINEREAL',
        token: ''
      })
    })
  })
  test('should return an error message if updateLinecheck service throws', async () => {
    const { updateLinecheckMock, sut, localStorageMock } = makeSut()
    jest.spyOn(localStorageMock, 'obtain').mockResolvedValue('AccountIdOrToken')
    const endLineBtn = await sut.findByTestId('startJourneyBtn')
    const error = new Error('update Line check throws')
    jest.spyOn(updateLinecheckMock, 'perform').mockRejectedValueOnce(error)
    await waitFor(() => {
      fireEvent.press(endLineBtn)
      const errorSubmit = sut.queryByTestId('errorSubmit')
      expect(errorSubmit).toHaveTextContent('update Line check throws')
    })
  })
  test('should save initKm value in localStorage correctly', async () => {
    const { sut, localStorageMock } = makeSut()
    const storageSpy = jest.spyOn(localStorageMock, 'save')
    const inputInitKm = await sut.findByTestId('inputInitKm')
    const startLineBtn = await sut.getByTestId('startLineBtn')
    await waitFor(() => {
      fireEvent.changeText(inputInitKm, 100)
      fireEvent.press(startLineBtn)
      expect(storageSpy).toHaveBeenCalledWith('initKm', '100')
    })
  })
  test('should obtain initKm from local storage correctly', async () => {
    const { sut, localStorageMock } = makeSut()
    const storageSpy = jest.spyOn(localStorageMock, 'obtain')
    const inputEndKm = await sut.findByTestId('inputEndKm')
    const endLineBtn = await sut.getByTestId('endLineBtn')
    await waitFor(() => {
      fireEvent.changeText(inputEndKm, 200)
      fireEvent.press(endLineBtn)
      expect(storageSpy).toHaveBeenCalledWith('initKm')
    })
  })
  test('should call insertKm use case correctly', async () => {
    const { sut, localStorageMock, insertKmMock } = makeSut()
    const insertKmSpy = jest.spyOn(insertKmMock, 'perform')
    const id = 'fake_id'
    const initKm = '100'
    const finalKm = 200
    jest.spyOn(localStorageMock, 'obtain').mockResolvedValueOnce(initKm)
    const inputEndKm = await sut.findByTestId('inputEndKm')
    const endLineBtn = await sut.getByTestId('endLineBtn')
    await waitFor(() => {
      fireEvent.changeText(inputEndKm, finalKm)
      fireEvent.press(endLineBtn)
      expect(insertKmSpy).toHaveBeenCalledWith({
        finalKm,
        initialKm: Number(initKm)
      }, id, '', '')
    })
  })
})
