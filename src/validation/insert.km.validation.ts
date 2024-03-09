import { number, object } from 'yup'

export const InitInsertKmValidationSchema = object({
  init: number()
    .integer()
    .required('Você precisa colocar a quilometragem inicial')
})
export const FinalInsertKmValidationSchema = object({
  final: number()
    .integer()
    .required('Você precisa colocar o valor da quilometragem final')
})
