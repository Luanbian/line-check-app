import React from 'react'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react-native'
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
    expect(email).not.toBeNull()
    expect(password).not.toBeNull()
    expect(submit).not.toBeNull()
    expect(errorEmail).toBeNull()
    expect(errorPassword).toBeNull()
  })
  test('should return error message if email field are empty', async () => {
    const { sut } = makeSut()
    const email = sut.getByTestId('emailField')
    fireEvent.changeText(email, '')
    const submit = sut.getByTestId('submitButton')
    fireEvent.press(submit)
    await waitFor(() => {
      const errorEmail = sut.queryByTestId('error-email')
      expect(errorEmail.props.children).toBe('O email é obrigatório')
    })
  })
  test('should return error message if email field are invalid format', async () => {
    const { sut } = makeSut()
    const email = sut.getByTestId('emailField')
    fireEvent.changeText(email, 'invalid_email')
    const submit = sut.getByTestId('submitButton')
    fireEvent.press(submit)
    await waitFor(() => {
      const errorEmail = sut.queryByTestId('error-email')
      expect(errorEmail.props.children).toBe('email inválido')
    })
  })
  test('should return error message if password field are empty', async () => {
    const { sut } = makeSut()
    const password = sut.getByTestId('passwordField')
    fireEvent.changeText(password, '')
    const submit = sut.getByTestId('submitButton')
    fireEvent.press(submit)
    await waitFor(() => {
      const errorpassword = sut.queryByTestId('error-password')
      expect(errorpassword.props.children).toBe('A senha é obrigatória')
    })
  })
})
