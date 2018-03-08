import { Validator } from './validator';
import { Message } from './message';
import { ReactSelectProps } from 'react-select';

export const validate = (validators: Validator[], toValidate: ReactSelectProps['value'], labelKey?: string) => {
    let errors: (string | JSX.Element)[] = [] as (string | JSX.Element)[];
    validators.forEach(validator => {
        if (errors.length !== 1) {
            const getError: Message | null = validator(toValidate);
            if (getError !== null) { errors.push(getError(labelKey)); }
        }
    });
    return errors[0] || null;
};