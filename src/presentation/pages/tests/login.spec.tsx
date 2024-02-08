import React from 'react'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import Login from '../login/login'
import { faker } from '@faker-js/faker'
import { type IAuthentication } from '../../../data/protocols/usecases/authentication.protocol'
import { makeAuthenticationMock } from '../../../data/tests/mocks/authentication.mock'
import { InvalidCredentialsError } from '../../../core/exceptions/invalid.credentials.error'
import { type IDecodeToken } from '../../../infra/protocols/decode.token.protocol'
import { makeDecodedTokenMock } from '../../../infra/tests/mocks/decoded.mock'

interface SutTypes {
  sut: RenderResult
  authenticationMock: IAuthentication
  decodedTokenMock: IDecodeToken
}

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() })
}))

const makeSut = (): SutTypes => {
  const authenticationMock = makeAuthenticationMock()
  const decodedTokenMock = makeDecodedTokenMock()
  const sut = render(<Login authentication={authenticationMock} decodeToken={decodedTokenMock}/>)
  return {
    sut, authenticationMock, decodedTokenMock
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
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationMock, 'auth').mockRejectedValueOnce(error)
    const invalidEmail = faker.internet.email()
    const email = sut.getByTestId('emailField')
    fireEvent.changeText(email, invalidEmail)
    const invalidPassword = faker.internet.password()
    const password = sut.getByTestId('passwordField')
    fireEvent.changeText(password, invalidPassword)
    const submit = sut.getByTestId('submitButton')
    await waitFor(() => {
      fireEvent.press(submit)
      const errorSubmit = sut.getByTestId('error-submit')
      expect(errorSubmit).toHaveTextContent(error.message)
    })
  })
  test('should call decodeToken with correct value', async () => {
    const { sut, decodedTokenMock, authenticationMock } = makeSut()
    const accessToken = { accessToken: 'fake_token' }
    jest.spyOn(authenticationMock, 'auth').mockResolvedValue(accessToken)
    const decodeSpy = jest.spyOn(decodedTokenMock, 'decode')
    const validEmail = faker.internet.email()
    const email = sut.getByTestId('emailField')
    fireEvent.changeText(email, validEmail)
    const validPassword = faker.internet.password()
    const password = sut.getByTestId('passwordField')
    fireEvent.changeText(password, validPassword)
    const submit = sut.getByTestId('submitButton')
    fireEvent.press(submit)
    await waitFor(() => {
      expect(decodeSpy).toHaveBeenCalledWith(accessToken.accessToken)
    })
  })
})
