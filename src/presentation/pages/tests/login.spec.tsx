import React from 'react'
import { render } from '@testing-library/react-native'
import Login from '../login/login'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() })
}))

describe('login page', () => {
  test('initial state', async () => {
    const { getByTestId, queryByTestId } = render(<Login/>)
    const title = getByTestId('title')
    const email = getByTestId('emailField')
    const password = getByTestId('passwordField')
    const submit = getByTestId('submitButton')
    const errorEmail = queryByTestId('error-email')
    const errorPassword = queryByTestId('error-password')
    expect(title.props.children).toBe('Login page')
    expect(email).toBeDefined()
    expect(password).toBeDefined()
    expect(submit).toBeDefined()
    expect(errorEmail).toBeNull()
    expect(errorPassword).toBeNull()
  })
})
