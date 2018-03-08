import * as Messages from './messages';
import { ReactSelectProps } from 'react-select';

export const isRequired = (value?: ReactSelectProps['value']) => {
    if (Array.isArray(value)) {
        const values = ([] as any[]).concat(value);
        return values.length === 0 ? Messages.isRequired : null;
    } else {
        return (value === '' || !value) ? Messages.isRequired : null;
    }
};