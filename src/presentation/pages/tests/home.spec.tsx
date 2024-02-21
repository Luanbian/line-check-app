import { type RenderResult, render, waitFor } from '@testing-library/react-native'
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
  })
})
