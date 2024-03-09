import { number, object } from 'yup'

export const insertKmValidationSchema = object({
  init: number().integer().required('Você precisa colocar a quilometragem inicial'),
  final: number().integer().required('Você precisa colocar o valor da quilometragem final')
})
