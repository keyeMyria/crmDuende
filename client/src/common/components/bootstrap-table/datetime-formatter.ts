import { isValid, parse } from 'date-fns';
import format from '../../util/format-date';

const dateDefaultFormat = 'DD MMM YYYY';

export function datetimeFormatter(datetime: Date | string | number, timeFormatter: string = 'HH:mm') {
    if (isValid(parse(datetime))) {
        return format(datetime, `${dateDefaultFormat} • ${timeFormatter}`);
    } else {
        return '';
    }
}