import Validator from './validator';
import Message from './message';
const runValidate = (
    validators?: Validator[],
    valueToValidate?: string,
    labelKey?: string) => {
    if (validators) {
        let errors: (string | JSX.Element)[] = [] as string[];
        validators.forEach((validator: Validator) => {
            const getError: Message | null = validator(valueToValidate);
            if (getError !== null) { errors.push(getError(labelKey)); }
        });
        return errors[0] || '';
    } else {
        return null;
    }
};

export default runValidate;