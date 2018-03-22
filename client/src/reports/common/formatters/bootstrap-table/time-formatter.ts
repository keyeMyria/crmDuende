const humanizeDuration = require('humanize-duration');

let humanizerLanguage: {
    language: 'shortEn',
    languages: {
        shortEn: {
            mo: () => 'mo',
            w: () => 'w',
            d: () => 'd',
            h: () => 'h',
            m: () => 'm',
            s: () => 's',
        }
    }
}; 

export const timeFormatter = (seconds: number) => {
    const miliseconds = seconds * 1000;
    return humanizeDuration(miliseconds, {
        ...humanizerLanguage,
        units: ['mo', 'd', 'h', 'm', 's'],
        round: true,
        delimiter: ' ',
        spacer: ''
    });
};