import React, { useEffect } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { useForm, type SubmitHandler } from 'react-hook-form'

interface Inputs {
  email: string
  password: string
}

export default function Login (): React.JSX.Element {
  const { register, setValue, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => { console.log(data.email, data.password) }

  useEffect(() => {
    register('email')
    register('password')
  }, [register])

  return (
    <View>
      <Text>Login page</Text>
      <TextInput placeholder='email' onChangeText={text => { setValue('email', text) }}/>
      <TextInput placeholder='senha' onChangeText={text => { setValue('password', text) }} secureTextEntry />
      <Button title='Enviar' onPress={handleSubmit(onSubmit)}/>
    </View>
  )
}
