import { format, distanceInWordsToNow } from 'date-fns';
import DateFNS from '../types/date-fns';

const dateDefaultFormat = 'DD MMM YYYY';

export default (date: DateFNS, formateStr?: string) => format(
    date, formateStr || dateDefaultFormat, {
        locale: 'es'
    }
);

export function fromNow(date: DateFNS): string {
    return distanceInWordsToNow(date, { locale: 'es' });
}

export const getFormat = (): string => 'es';