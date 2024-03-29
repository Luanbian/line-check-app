import React, { useState, useContext } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { type IAuthentication } from '../../../data/protocols/authentication.protocol'
import { type IDecodeToken } from '../../../infra/protocols/decode.token.protocol'
import { loginValidationSchema } from '../../../validation/login.validation'
import { AuthContext } from '../../contexts/auth.context'

interface Props {
  authentication: IAuthentication
  decodeToken: IDecodeToken
}

interface Inputs {
  email: string
  password: string
}

export default function Login ({ authentication, decodeToken }: Props): React.JSX.Element {
  const { getLoggedUserData } = useContext(AuthContext)
  const navigation = useNavigation()
  const { setValue, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(loginValidationSchema)
  })
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { accessToken } = await authentication.auth(data)
      const { role, sub } = await decodeToken.decode(accessToken)
      getLoggedUserData(sub, accessToken)
      navigation.navigate(role.toUpperCase() as never)
    } catch (error) {
      if (error instanceof Error) {
        setErrorSubmit(error.message)
      }
    }
  }

  return (
    <View>
      <Text testID='title'>Login page</Text>
      <TextInput
        testID='emailField'
        placeholder='email'
        onChangeText={text => { setValue('email', text) }}
      />
      {(errors.email != null) && <Text testID='error-email'>{errors.email.message}</Text>}
      <TextInput
        testID='passwordField'
        placeholder='senha'
        onChangeText={text => { setValue('password', text) }}
        secureTextEntry
      />
      {(errors.password != null) && <Text testID='error-password'>{errors.password.message}</Text>}
      <Button testID='submitButton' title='Enviar' onPress={handleSubmit(onSubmit)}/>
      {(errorSubmit != null) && <Text testID='error-submit'>{errorSubmit}</Text>}
    </View>
  )
}
