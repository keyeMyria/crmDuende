import * as React from 'react';
import validate from './validate';
import '../../resources/styles/input-validation.css';
import Validator from './validator';
import ReactTelephoneInput, { ReactTelephoneInputCountry, isNumberValid } from 'react-telephone-input';
import { telephone } from './messages';
import '../../resources/styles/react-telephone-input.css';
const countryData: any = require('country-telephone-data');
const flags = require('../../resources/pictures/flags.png') as string;

export const telephoneValidator = (phone: string) => {
    if (isNumberValid(phone)) {
        return null;
    } else {
        return telephone;
    }
};

export interface PhoneInputValidationProps {
    phone: string;
    country: string;
    dialCode?: string;
    validators?: Validator[];
    valueKey?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    messageError?: string;
    forceVerify?: boolean;
    autoFocus?: boolean;
    verifyOnChange?: string;
    disabled?: boolean;
    inputProps?: React.HTMLAttributes<HTMLInputElement>;
    onError?(valueKey: string, error?: string | JSX.Element | null, wasForced?: boolean): void;
    onChange(phone: string, countryCode: string): void;
}

export interface PhoneInputValidationState {
    messageError?: string | JSX.Element | null;
    hasForcedToVerify?: boolean;
}

export default class PhoneValidation extends React.Component<PhoneInputValidationProps, PhoneInputValidationState> {

    state = {
        messageError: this.props.messageError,
        hasForcedToVerify: false
    };

    componentWillReceiveProps(nextProps: PhoneInputValidationProps) {
        if (this.props.phone !== nextProps.phone) {
            this.validateInput(nextProps);
        } else if (nextProps.forceVerify && !this.state.hasForcedToVerify) {
            this.validateInput(nextProps, true);
            this.setState({ hasForcedToVerify: true });
        } else if (nextProps.verifyOnChange !== this.props.verifyOnChange && nextProps.phone !== '') {
            this.validateInput(nextProps);
        }
    }

    parseValue = (phone: string, country: string) => {
        const lowerCountry =  country.toLowerCase();
        const conuntryIndex = countryData.iso2Lookup[lowerCountry];
        const countryInfo = countryData.allCountries[conuntryIndex] || { dialCode: ''};
        return `${countryInfo.dialCode}${phone}`;
    }

    validateInput = (props: PhoneInputValidationProps, wasForced?: boolean) => {
        if (props.validators) {
            const messageError = validate(props.validators, props.phone, props.label) ||
                validate([telephoneValidator], this.filterNumbers(props.phone), props.label);
            if (props.onError) { props.onError(props.valueKey || '', messageError, wasForced); }
            this.setState({ messageError });
        }
    }

    filterNumbers = (phone: string) => phone.replace(/\D/g, '');

    formatPhone = (phone: string, dialCode: string) => phone.replace(dialCode, '');

    handleBlur = () => {
        this.validateInput(this.props);
    }

    handleChange = (phone: string, country: ReactTelephoneInputCountry) => {
        const { iso2 } = country;
        if (phone === '+') {
            this.props.onChange('', '');
        } else {
            const { dialCode } = country;
            const phoneNumber = this.formatPhone(this.filterNumbers(phone), dialCode);
            this.props.onChange( phoneNumber, iso2.toUpperCase());
        }
    }

    renderInput = (props?: React.HTMLAttributes<HTMLInputElement>) => (
        <ReactTelephoneInput
            {...props}
            value={this.parseValue(this.props.phone, this.props.country)}
            autoFormat={true}
            onChange={this.handleChange}
            disabled={this.props.disabled}
            flagsImagePath={flags}
            preferredCountries={['gt']}
        />
    )

    renderWithValidations = () => {
        const shouldShowErrors = !!this.state.messageError;
        const isDisabled = this.props.disabled;
        return (
            <div>
                {this.renderInput({
                    className: `${shouldShowErrors && 'input-validation-alert'} ${isDisabled && 'disabled-input'}`,
                    onBlur: this.handleBlur,
                })}
                {shouldShowErrors && (
                    <label className="label-validation-alert">{this.state.messageError}</label>
                )}
            </div>
        );
    }

    render() {
        return this.props.validators ? this.renderWithValidations() : this.renderInput();
    }
}