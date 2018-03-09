import * as Messages from './messages';
// tslint:disable-next-line:max-line-length
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegex = /[\+]{0,1}[0-9]{0,3}[0-9]{3,4}[\-]{0,1}[0-9]{3,4}$/;
const numberRegex = /\d/g;
const accentRegex = /[áéíóú]+/i;
const specialCharacters = /^[\-0-9a-záéíóúñ_. ]+$/i;
const alphaNumRegex = /^[\-0-9a-záéíóúñÑ_. ]{1,}$/i;
const maxTwoDecimalsRegex = /^-?[0-9]+(\.[0-9]{1,2})?$/i;
const numRegex = /^((-)?(?=\d))\d*(\.\d*)?$/;

const isNotEmpty = (value?: string) => (!!value && value.trim() !== '');

export const required = (value?: string) => (value && value.length > 0) ? null : Messages.isRequired;

export const minLength = (min: number) => {
    return (value?: string) => {
        return (value || '').length < min ? Messages.minLength(min) : null;
    };
};

export const maxLength = (max: number) => {
    return (value?: string) => {
        return (value || '').length > max ? Messages.maxLength(max) : null;
    };
};

export const mustMatch = (otherLabel: string, otherValue?: string) => {
    return (value?: string) => {
        return value === otherValue ? null : Messages.mustMatch(otherLabel);
    };
};

export const minMaxLength = (min: number, max: number) => {
    return (value?: string) => {
        return ((value || '').length >= min && (value || '').length <= max)
            ? null
            : Messages.minMaxLength(min, max);
    };
};

export const isEmail = (email?: string) =>
    (!email || email.trim() === '' || emailRegex.test(email.trim())) ? null : Messages.isEmail;

export const equalLength = (length: number) => {
    return (value?: string) => {
        return (isNotEmpty(value) && (value || '').length !== length) ? Messages.equalLength(length) : null;
    };
};

export const matchPassword = (password?: string) =>
    (verifyPassword?: string) => {
        if (
            verifyPassword !== password
        ) {
            return Messages.passwordDontMatch;
        } else {
            return null;
        }
    };

export const isUnique = (takenOptions: string[], currentValue: string) =>
    (value: string) => {
        if (isNotEmpty(value) && takenOptions.includes(value.trim()) && value.trim() !== currentValue.trim()) {
            return Messages.isUnique(value);
        } else {
            return null;
        }
    };

export const isPhone = (phone: string) => {
    if (isNotEmpty(phone) && !phoneRegex.test(phone.trim())) {
        return Messages.isPhone;
    } else {
        return null;
    }
};

export const noNumbers = (value: string) => {
    if (isNotEmpty(value) && numberRegex.test(value.trim())) {
        return Messages.noNumbers;
    } else {
        return null;
    }
};

export const noAccents = (value: string) => {
    if (isNotEmpty(value) && accentRegex.test(value)) {
        return Messages.noAccents;
    } else {
        return null;
    }
};

export const noSpecialCharacters = (value: string) => {
    if (isNotEmpty(value) && specialCharacters.test(value)) {
        return null;
    } else {
        return Messages.noSpecialCharacters;
    }
};

export const alphaNum = (value: string) => {
    if (isNotEmpty(value) && alphaNumRegex.test(value)) {
        return Messages.alphaNum;
    } else {
        return null;
    }
};

export const maxTwoDecimals = (value: string) => {
    if (isNotEmpty(value) && maxTwoDecimalsRegex.test(value)) {
        return null;
    } else {
        return Messages.maxTwoDecimals;
    }
};

export const isNumber = (value: string) => {
    if (isNotEmpty(value) && numRegex.test(value.trim())) {
        return null;
    }
    return Messages.isNumber;
};

export const noZero = (value: string) => {
    if (isNotEmpty(value) && (value.trim() === '0' || value.trim() === '-0')) {
        return Messages.noZero;
    }
    return null;
};

export const noNegativeNumber = (value: string) => {
    if (Math.sign(parseInt(value, 10)) === -1) {
        return Messages.noNegativeNumber;
    }
    return null;
};