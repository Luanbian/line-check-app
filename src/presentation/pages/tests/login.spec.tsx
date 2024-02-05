import React from 'react'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react-native'
import Login from '../login/login'
import { faker } from '@faker-js/faker'
import { type authParamns, type IAuthentication } from '../../../data/protocols/usecases/authentication.protocol'
import { type accountProps } from '../../../domain/entities/account'
import { accountMock } from '../../../data/tests/mocks/authentication.mock'

interface SutTypes {
  sut: RenderResult
  authenticationMock: IAuthentication
}

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() })
}))

const makeAuthenticationMock = (): IAuthentication => {
  class AuthenticationMock implements IAuthentication {
    public async auth (params: authParamns): Promise<accountProps> {
      return accountMock()
    }
  }
  return new AuthenticationMock()
}

const makeSut = (): SutTypes => {
  const authenticationMock = makeAuthenticationMock()
  const sut = render(<Login authentication={authenticationMock}/>)
  return {
    sut, authenticationMock
  }
}

describe('login page', () => {
  afterEach(cleanup)
  test('initial state', async () => {
    const { sut } = makeSut()
    const title = sut.getByTestId('title')
    expect(title.props.children).toBe('Login page')
    const email = sut.getByTestId('emailField')
    expect(email).not.toBeNull()
    const password = sut.getByTestId('passwordField')
    expect(password).not.toBeNull()
    const submit = sut.getByTestId('submitButton')
    expect(submit).not.toBeNull()
    const errorEmail = sut.queryByTestId('error-email')
    expect(errorEmail).toBeNull()
    const errorPassword = sut.queryByTestId('error-password')
    expect(errorPassword).toBeNull()
    const errorSubmit = sut.queryByTestId('error-submit')
    expect(errorSubmit).toBeNull()
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
  test('should call authenticate with email and password', async () => {
    const { sut, authenticationMock } = makeSut()
    const validEmail = faker.internet.email()
    const email = sut.getByTestId('emailField')
    fireEvent.changeText(email, validEmail)
    const validPassword = faker.internet.password()
    const password = sut.getByTestId('passwordField')
    fireEvent.changeText(password, validPassword)
    const submit = sut.getByTestId('submitButton')
    fireEvent.press(submit)
    const authSpy = jest.spyOn(authenticationMock, 'auth')
    await waitFor(() => {
      expect(authSpy).toHaveBeenCalledWith({ email: validEmail, password: validPassword })
    })
  })
  test('should return error message if credentials are invalid', async () => {
    const { sut, authenticationMock } = makeSut()
    const invalidEmail = faker.internet.email()
    const email = sut.getByTestId('emailField')
    fireEvent.changeText(email, invalidEmail)
    const invalidPassword = faker.internet.password()
    const password = sut.getByTestId('passwordField')
    fireEvent.changeText(password, invalidPassword)
    const submit = sut.getByTestId('submitButton')
    fireEvent.press(submit)
    const authSpy = jest.spyOn(authenticationMock, 'auth').mockRejectedValueOnce(() => {
      throw new Error('Credenciais inválidas')
    })
    await waitFor(() => {
      expect(authSpy).toHaveBeenCalledWith({
        email: invalidEmail,
        password: invalidPassword
      })
    })
  })
})
