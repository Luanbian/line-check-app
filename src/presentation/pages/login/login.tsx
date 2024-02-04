import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { type IAuthentication } from '../../../data/protocols/usecases/authentication.protocol'

const fieldsValidationSchema = object({
  email: string().email('email inválido').required('O email é obrigatório'),
  password: string().required('A senha é obrigatória')
})

interface Props {
  authentication: IAuthentication
}

interface Inputs {
  email: string
  password: string
}

export default function Login ({ authentication }: Props): React.JSX.Element {
  const navigation = useNavigation()
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(fieldsValidationSchema)
  })
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await authentication.auth(data)
      navigation.navigate('Home' as never)
    } catch (error) {
      if (error instanceof Error) {
        setErrorSubmit(error.message)
      }
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
