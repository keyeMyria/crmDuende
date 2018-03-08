import { format, distanceInWordsToNow } from 'date-fns';
import DateFNS from '../types/date-fns';

export default (date: DateFNS, formateStr?: string) => format(
    date, formateStr || window.__dateDefaultFormat__, {
        locale: window.__localeId__
    }
);

export function fromNow(date: DateFNS): string {
    return distanceInWordsToNow(date, { locale: window.__localeId__ });
}

export const getFormat = (): string => window.__dateDefaultFormat__;