import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const isRequired = (fieldName: string) => (
    <FormattedMessage id="global.validators.is_required" values={{ fieldName }} />
);

export const minLength = (min: number) => {
    return (fieldName: string) => (
        <FormattedMessage id="global.validators.min_length" values={{ fieldName, min }} />
    );
};

export const maxLength = (max: number) => {
    return (fieldName: string) => (
        <FormattedMessage id="global.validators.max_length" values={{ fieldName, max }} />
    );
};

export const mustMatch = (otherFieldName: string) => {
    return (fieldName: string) => (
        <FormattedMessage id="global.validators.max_length" values={{ fieldName, otherFieldName }} />
    );
};

export const minMaxLength = (min: number, max: number) => {
    return (fieldName: string) => (
        <FormattedMessage id="global.validators.min_max_length" values={{ fieldName, min, max }} />
    );
};

export const isEmail = () => (
    <FormattedMessage id="global.validators.is_email" />
);

export const equalLength = (length: number) => {
    return (fieldName: string) => (
        <FormattedMessage id="global.validators.equal_length" values={{ fieldName, length }} />
    );
};

export const passwordDontMatch = () => (
    <FormattedMessage id="global.validators.password_dont_match" />
);

export const isUnique = (value: string) => (fieldName: string) => (
    <FormattedMessage id="global.validators.isUnique" values={{ value, fieldName }} />
);

export const isPhone = (fieldName: string) => <FormattedMessage id="global.validators.is_phone" />;

export const noNumbers = (fieldName: string) => (
    <FormattedMessage id="global.validators.no_numbers" values={{ fieldName }} />
);

export const noAccents = (fieldName: string) => (
    <FormattedMessage id="global.validators.no_accents" values={{ fieldName }} />
);

export const noSpecialCharacters = (fieldName: string) => (
    <FormattedMessage id="global.validators.no_special_characters" values={{ fieldName }} />
);
export const alphaNum = (fieldName: string) => (
    <FormattedMessage id="global.validators.alpha_num" values={{ fieldName }} />
);

export const telephone = (fieldName: string) => (
    <FormattedMessage id="global.validators.telephone" values={{ fieldName }} />
);

export const maxTwoDecimals = (fieldName: string) => (
    <FormattedMessage id="global.validators.maxTwoDecimals_num" values={{ fieldName }} />
);

export const isNumber = (fieldName: string) => (
    <FormattedMessage id="global.validators.is_number" values={{ fieldName }} />
);

export const noZero = (fieldName: string) => (
    <FormattedMessage id="global.validators.no_zero" values={{ fieldName }} />
);

export const noNegativeNumber = (fieldName: string) => (
    <FormattedMessage id="global.validators.no_negative_number" values={{ fieldName }} />
);
