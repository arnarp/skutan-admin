import { isKennitala } from '../../Utils/stringValidators'

export type TextInputValidator = (value: string) => string | null

export const RequiredTextInputValidator: TextInputValidator = value => {
  if (value === '') {
    return 'Má ekki vera tómt'
  }
  return null
}

export const KennitalaTextInputValidator: TextInputValidator = value =>
  isKennitala(value) ? null : 'Ekki lögleg kennitala'

export const OnlyDigitsTextInputValidator: TextInputValidator = value =>
  /^\d+$/.test(value) ? null : 'Einungis tölustafir leyfðir'