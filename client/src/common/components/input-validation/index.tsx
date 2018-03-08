import InputValidation from './input-validation';

const inputValidation = InputValidation;

export default inputValidation;

import * as Validators from './validators';

export const validators = Validators;

import Validator from './validator';

export type Validator = Validator;

import phoneValidation from './phone-validation';

export const PhoneValidation = phoneValidation;