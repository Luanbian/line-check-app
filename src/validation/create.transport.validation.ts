import { object, string } from 'yup'

export const createTransportValidationSchema = object({
  value: string().required('O valor é obrigatório')
})
