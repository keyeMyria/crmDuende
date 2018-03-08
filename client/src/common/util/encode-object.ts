export const encodeObject = (object: {}) => {
    return Object.keys(object).filter(key => key !== 'id').map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`;
    }).join('&');
};