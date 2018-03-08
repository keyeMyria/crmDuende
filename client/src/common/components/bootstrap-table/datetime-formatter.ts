import { isValid, parse } from 'date-fns';
import format from '../../util/format-date';

export function datetimeFormatter(datetime: Date | string | number, timeFormatter: string = 'HH:mm') {
    if (isValid(parse(datetime))) {
        return format(datetime, `${window.__dateDefaultFormat__} • ${timeFormatter}`);
    } else {
        return '';
    }
}