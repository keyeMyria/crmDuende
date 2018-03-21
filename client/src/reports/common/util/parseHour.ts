import { startOfToday, addHours, addMinutes } from 'date-fns';

export const parseHour = (time: string) => {
    const [hour, minutes] = time.split(':');
    const today = startOfToday();
    const dayWithHours = addHours(today, parseInt(hour, 10));
    return addMinutes(dayWithHours, parseInt(minutes, 10));
};