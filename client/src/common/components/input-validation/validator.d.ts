import Message from './message';
type Validator = (valueToValidate?: string | number) => Message | null;
export default Validator;