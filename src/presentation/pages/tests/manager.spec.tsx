import React from 'react'
import { type RenderResult, render, waitFor } from '@testing-library/react-native'
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
})
