import * as React from 'react';
import validate from './validate';
import '../../resources/styles/input-validation.css';
import Validator from './validator';

export interface GenericValidationProps {
    value?: string;
    valueName?: string; 
    onInputChange: (inputChange: string, valueKey?: string) => void;
    validators: Validator[];
    valueKey?: string;
    labelKey?: string;
    type?: string;
    inputClassName?: string;
    placeholder?: string;
    messageError?: string;
    onChangeError?: (valueKey: string, error?: string | JSX.Element | null, wasForced?: boolean) => void;
    forceVerify?: boolean;
    autoFocus?: boolean;
    verifyOnChange?: string;
    children(value: string, props: {}): JSX.Element;
}

export interface GenericValidationState {
    messageError?: string | JSX.Element | null;
    hasForcedToVerify?: boolean;
}

export default class GenericValidation extends React.Component<GenericValidationProps, GenericValidationState> {

    state = {
        messageError: this.props.messageError,
        hasForcedToVerify: false
    };

    componentWillReceiveProps(nextProps: GenericValidationProps) {
        if (this.props.value !== nextProps.value) {
            this.validateInput(nextProps);
        } else if (nextProps.forceVerify && !this.state.hasForcedToVerify) {
            this.validateInput(nextProps, true);
            this.setState({ hasForcedToVerify: true });
        } else if (nextProps.verifyOnChange !== this.props.verifyOnChange && nextProps.value !== '') {
            this.validateInput(nextProps);
        }
    }

    validateInput = (props: GenericValidationProps, wasForced?: boolean) => {
        if (props.validators) {
            const messageError = validate(props.validators, props.value, props.labelKey);
            if (props.onChangeError) { props.onChangeError(props.valueKey || '', messageError, wasForced); }
            this.setState({ messageError });
        }
    }

    onInputLostFocus = () => {
        this.validateInput(this.props);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue.trim().length > 0 || newValue === '') { this.props.onInputChange(newValue, this.props.valueKey); }
    }

    render() {
        const shouldShowErrors = this.state.messageError ? true : false;
        return (
            <div>
                {this.props.children(this.props.value || '', {
                    onBlur: this.onInputLostFocus
                })}
                {shouldShowErrors && (
                    <label className="label-validation-alert">{this.state.messageError}</label>
                )}
            </div>
        );
    }
}