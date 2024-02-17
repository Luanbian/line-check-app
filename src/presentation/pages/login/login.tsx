import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { type IAuthentication } from '../../../data/protocols/usecases/authentication.protocol'
import { type IDecodeToken } from '../../../infra/protocols/decode.token.protocol'
import { type ILocalStorage } from '../../../infra/protocols/local.storage.protocol'

const fieldsValidationSchema = object({
  email: string().email('email inválido').required('O email é obrigatório'),
  password: string().required('A senha é obrigatória')
})

interface Props {
  authentication: IAuthentication
  decodeToken: IDecodeToken
  localStorage: ILocalStorage
}

interface Inputs {
  email: string
  password: string
}

export default function Login ({ authentication, decodeToken, localStorage }: Props): React.JSX.Element {
  const navigation = useNavigation()
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(fieldsValidationSchema)
  })
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { accessToken } = await authentication.auth(data)
      const { role, sub } = decodeToken.decode(accessToken)
      await Promise.all([
        localStorage.save('token', accessToken),
        localStorage.save('accountId', sub),
        redirect(role)
      ])
    } catch (error) {
      if (error instanceof Error) {
        setErrorSubmit(error.message)
      }
    }
  }

  const redirect = async (role: string): Promise<void> => {
    try {
      const captalize = role[0].toUpperCase() + role.substring(1)
      navigation.navigate(captalize as never)
    } catch (error) {
      navigation.navigate('Login' as never)
    }
  }

  useEffect(() => {
    register('email')
    register('password')
  }, [register])

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
