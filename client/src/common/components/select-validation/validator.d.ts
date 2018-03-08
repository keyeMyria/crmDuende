import { Message } from './message';
import { ReactSelectProps } from 'react-select';
export type Validator = (valueToValidate?: ReactSelectProps['value']) => Message | null;