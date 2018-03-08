import { isValid, parse } from 'date-fns';
import format from '../../util/format-date';

export function dateFormatter(date: Date | string | number) {
    if (isValid(parse(date))) {
        return format(date, `${window.__dateDefaultFormat__}`);
    } else {
        return '';
    }
}