const humanizeDuration = require('humanize-duration');

export const timeFormatter = (seconds: number) => {
    const miliseconds = seconds * 1000;
    return humanizeDuration(miliseconds, {
        ...window.__locale_humanizer__,
        units: ['mo', 'd', 'h', 'm', 's'],
        round: true,
        delimiter: ' ',
        spacer: ''
    });
};