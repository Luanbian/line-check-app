import React from 'react'
import { type RenderResult, render } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import CreateLineForm, { type ParamList } from '../manager/create.line.form'
import { type RouteProp } from '@react-navigation/native'
import { entityNamesMock } from '../../../data/tests/mocks/entity.names.mock'
import { makeCreateLineMock } from '../../../data/tests/mocks/create.line.mock'
import { type ICreateLine } from '../../../data/protocols/create.line.protocol'
import { makeUpdateLineMock } from '../../../data/tests/mocks/update.line.mock'

interface SutTypes {
  sut: RenderResult
  routeMock: RouteProp<ParamList, 'CREATELINE'>
  createLineMock: ICreateLine
}

const makeSut = (): SutTypes => {
  const routeMock: RouteProp<ParamList, 'CREATELINE'> = {
    key: 'random_key',
    name: 'CREATELINE',
    params: {
      data: [
        entityNamesMock('accounts'),
        entityNamesMock('logistics'),
        entityNamesMock('manufactures'),
        entityNamesMock('services'),
        entityNamesMock('vehicles')
      ],
      id: undefined,
      token: 'fake_token'
    }
  }
  const createLineMock = makeCreateLineMock()
  const updateLineMock = makeUpdateLineMock()
  const sut = render(
    <CreateLineForm
      route={routeMock}
      createLine={createLineMock}
      updateLine={updateLineMock}
    />
  )
  return {
    sut, routeMock, createLineMock
  }
}
describe('CreateLineForm', () => {
  test('first state of form', async () => {
    const { sut } = makeSut()
    const flatList = sut.findByTestId('flatList')
    expect(flatList).toBeDefined()
    const sltDriver = sut.getByTestId('sltDriver')
    expect(sltDriver).toHaveTextContent('Selecione o motorista')
    const sltRoad = sut.getByTestId('sltRoad')
    expect(sltRoad).toHaveTextContent('Selecione o trajeto')
    const sltService = sut.getByTestId('sltService')
    expect(sltService).toHaveTextContent('Selecione o serviço')
    const sltManufacture = sut.getByTestId('sltManufacture')
    expect(sltManufacture).toHaveTextContent('Selecione a fábrica de destino')
    const sltVehicle = sut.getByTestId('sltVehicle')
    expect(sltVehicle).toHaveTextContent('Selecione o veiculo')
    const sltDayOfWeek = sut.getByTestId('sltDayOfWeek')
    expect(sltDayOfWeek).toHaveTextContent('Selecione os dias da semana')
    const errorMessage = sut.queryByTestId('error-message')
    expect(errorMessage).toBeNull()
    const putInitJourney = sut.getByTestId('putInitJourney')
    expect(putInitJourney).toHaveTextContent('Horário de inicio da jornada')
    const putInitLine = sut.getByTestId('putInitLine')
    expect(putInitLine).toHaveTextContent('Horário de inicio da linha')
    const putEndLine = sut.getByTestId('putEndLine')
    expect(putEndLine).toHaveTextContent('Horário de fim da jornada')
    const btnCreate = sut.getByTestId('btnCreate')
    expect(btnCreate).toHaveTextContent('Confirmar')
  })
})
