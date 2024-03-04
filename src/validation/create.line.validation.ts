import { object, string } from 'yup'

export const createLineValidationSchema = object({
  account: string().required('O motorista não está selecionado'),
  logistic: string().required('O trajeto não está selecionado'),
  service: string().required('O serviço não está selecionado'),
  manufacture: string().required('A fábrica não está selecionado'),
  vehicle: string().required('O veículo não está selecionado'),
  startJourney: string().nonNullable().required('O horário para começar a jornada não está selecionado'),
  startLine: string().nonNullable().required('O horário para começar a linha não está selecionado'),
  endLine: string().nonNullable().required('O horário para terminar a jornada não está selecionado')
})
