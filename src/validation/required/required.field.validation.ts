import { RequiredFieldError } from '../errors/required.field.error'
import { type FieldValidation } from '../protocols/field.validation.protocol'

export class RequiredFieldsValidation implements FieldValidation {
  constructor (readonly field: string) {}

  public validate (value: string): Error {
    return new RequiredFieldError()
  }
}
