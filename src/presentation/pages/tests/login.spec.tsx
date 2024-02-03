import React from 'react'
import { type RenderResult, render, cleanup } from '@testing-library/react-native'
import Login from '../login/login'

interface SutTypes {
  sut: RenderResult
}

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() })
}))

const makeSut = (): SutTypes => {
  const sut = render(<Login/>)
  return {
    sut
  }
}

describe('login page', () => {
  afterEach(cleanup)
  test('initial state', async () => {
    const { sut } = makeSut()
    const title = sut.getByTestId('title')
    const email = sut.getByTestId('emailField')
    const password = sut.getByTestId('passwordField')
    const submit = sut.getByTestId('submitButton')
    const errorEmail = sut.queryByTestId('error-email')
    const errorPassword = sut.queryByTestId('error-password')
    expect(title.props.children).toBe('Login page')
    expect(email).toBeDefined()
    expect(password).toBeDefined()
    expect(submit).toBeDefined()
    expect(errorEmail).toBeNull()
    expect(errorPassword).toBeNull()
  })
})
