import { isValid, parse } from 'date-fns';
import format from '../../util/format-date';

const dateDefaultFormat = 'DD MMM YYYY'

export function dateFormatter(date: Date | string | number) {
    if (isValid(parse(date))) {
        return format(date, `${dateDefaultFormat}`);
    } else {
        return '';
    }
}