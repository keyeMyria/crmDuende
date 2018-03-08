import * as React from 'react';
import validate from './validate';
import '../../resources/styles/input-validation.css';
import Validator from './validator';

export interface InputValidationProps {
    value?: string;
    onInputChange: (inputChange: string, valueKey?: string) => void;
    externalErrors?: {[valueKey: string]: string | JSX.Element};
    validators?: Validator[];
    valueKey?: string;
    labelKey?: string;
    type?: string;
    inputClassName?: string;
    placeholder?: string;
    messageError?: string;
    disabled?: boolean;
    onChangeError?: (valueKey: string, error?: string | JSX.Element | null, wasForced?: boolean) => void;
    forceVerify?: boolean;
    autoFocus?: boolean;
    verifyOnChange?: string;
    readOnly?: boolean; 
}

export interface InputValidationState {
    messageError?: string | JSX.Element | null;
    hasForcedToVerify?: boolean;
}

export default class InputValidation extends React.Component<InputValidationProps, InputValidationState> {

    state = {
        messageError: this.props.messageError,
        hasForcedToVerify: false
    };

    componentWillReceiveProps(nextProps: InputValidationProps) {
        if (this.props.value !== nextProps.value) {
            this.validateInput(nextProps);
        } else if (nextProps.forceVerify && !this.state.hasForcedToVerify) {
            this.validateInput(nextProps, true);
            this.setState({hasForcedToVerify: true});
        } else if (nextProps.verifyOnChange !== this.props.verifyOnChange && nextProps.value !== '') {
            this.validateInput(nextProps);
        } else if (nextProps.externalErrors && nextProps.valueKey && nextProps.externalErrors[nextProps.valueKey]) {
            this.setState({messageError: nextProps.externalErrors[nextProps.valueKey]});
        }
    }

    validateInput = (props: InputValidationProps, wasForced?: boolean) => {
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

    renderWithValidations = () => {
        const shouldShowErrors = this.state.messageError ? true : false;
        return (
            <div className="full-width">
                <input
                    type={this.props.type || 'text'}
                    value={this.props.value}
                    onChange={this.handleChange}
                    className={`${this.props.inputClassName} ${shouldShowErrors && 'input-validation-alert'}`}
                    placeholder={this.props.placeholder}
                    onBlur={this.onInputLostFocus}
                    autoFocus={this.props.autoFocus}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                />
                {shouldShowErrors && (
                    <label className="label-validation-alert">{this.state.messageError}</label>
                )}
            </div>
        );
    }

    renderWithOutValidations = () => (
        <input
            type={this.props.type || 'text'}
            value={this.props.value}
            onChange={this.handleChange}
            className={this.props.inputClassName}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
        />
    )

    render() {
        return this.props.validators ? this.renderWithValidations() : this.renderWithOutValidations();
    }
}