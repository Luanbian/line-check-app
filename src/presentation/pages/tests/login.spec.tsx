import React from 'react'
import { render } from '@testing-library/react-native'
import Login from '../login/login'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() })
}))

describe('login page', () => {
  test('initial state', async () => {
    const { getByTestId } = render(<Login/>)
    const title = getByTestId('title')
    expect(title.props.children).toBe('Login page')
  })
})
