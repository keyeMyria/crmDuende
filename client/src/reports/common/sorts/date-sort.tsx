
import { parse } from 'date-fns';

export function sortDate(a: number | string | Date, b: number | string | Date , order: 'desc' | 'asc') {
    const aDate = parse(a);
    const bDate = parse(b);
    const aUnix = aDate.getTime();
    const bUnix = bDate.getTime();    
    if (order === 'asc') {
        return aUnix - bUnix;
    } else {
        return bUnix - aUnix;
    }
} 