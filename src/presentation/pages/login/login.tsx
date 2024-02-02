import React, { useEffect } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const fieldsValidationSchema = object({
  email: string().email('email inválido').required('O email é obrigatório'),
  password: string().required('A senha é obrigatória')
})

interface Inputs {
  email: string
  password: string
}

export default function Login (): React.JSX.Element {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(fieldsValidationSchema)
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.email, data.password)
  }

  useEffect(() => {
    register('email')
    register('password')
  }, [register])

  return (
    <View>
      <Text>Login page</Text>
      <TextInput placeholder='email' onChangeText={text => { setValue('email', text) }}/>
      {(errors.email != null) && <Text>{errors.email.message}</Text>}
      <TextInput placeholder='senha' onChangeText={text => { setValue('password', text) }} secureTextEntry />
      {(errors.password != null) && <Text>{errors.password.message}</Text>}
      <Button title='Enviar' onPress={handleSubmit(onSubmit)}/>
    </View>
  )
}
