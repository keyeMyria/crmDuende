import * as React from 'react';
import * as DateTime from 'react-datetime';
import { InputValidationState } from './input-validation';
import * as moment from 'moment';
import validate from './validate';
import '../../resources/styles/input-validation.css';
import 'react-datetime/css/react-datetime.css';
import { Validator } from '.';

export interface DateValidationProps {
    locale?: string;
    value?: Date;
    disableBeforeTo?: Date;
    disableAfterTo?: Date;
    onInputChange: (inputChange: string, valueKey?: string) => void;
    validators?: Validator[];
    valueKey?: string;
    labelKey?: string;
    inputClassName?: string;
    placeholder?: string;
    messageError?: string;
    format?: string;
    disabled?: boolean;
    renderDate?(props: DateValidationProps): JSX.Element;
}

export default class DateValidation extends React.Component<DateValidationProps, InputValidationState> {

    state = {
        messageError: this.props.messageError
    };

    componentWillReceiveProps(nextProps: DateValidationProps) {
        if (this.props.value !== nextProps.value) { this.validateInput(nextProps); }
    }

    shouldValidateDisabledDates = () => !!this.props.disableAfterTo || !!this.props.disableBeforeTo;

    isValidDate = (date: Date) => {
        if (this.props.disableAfterTo && this.props.disableBeforeTo) {
            return date > this.props.disableBeforeTo && date < this.props.disableAfterTo;
        } else {
            const disabledLimit = this.props.disableAfterTo || this.props.disableBeforeTo || new Date();
            if (this.props.disableAfterTo) {
                return date < disabledLimit;
            } else { return date > disabledLimit; }
        }
    }

    validateInput = (nextProps: DateValidationProps) => {
        if (nextProps.validators) {
            const value = nextProps.value ? nextProps.value.toISOString() : undefined;
            const messageError = validate(this.props.validators, value, nextProps.labelKey);
            this.setState({ messageError });
        }
    }

    onInputLostFocus = () => {
        this.validateInput(this.props);
    }

    handleChange = (date: moment.Moment) => {
        this.props.onInputChange(date.toISOString(), this.props.valueKey);
    }

    renderWithValidations = () => {
        const shouldShowErrors = this.state.messageError ? true : false;
        return (
            <div>
                <DateTime
                    value={this.props.value}
                    inputProps={{
                        className: 
                            `${this.props.inputClassName} 
                             ${shouldShowErrors && 'input-validation-alert'} 
                             ${'icon-calendar'}`,
                        placeholder: this.props.placeholder,
                        disabled: this.props.disabled

                    }}
                    onChange={this.handleChange}
                    timeFormat={false}
                    utc={true}
                    locale={this.props.locale}
                    onBlur={this.onInputLostFocus}
                    dateFormat={this.props.format}
                    isValidDate={this.shouldValidateDisabledDates() ? this.isValidDate : undefined}
                />
                {shouldShowErrors && (
                    <label className="label-validation-alert">{this.state.messageError}</label>
                )}
            </div>
        );
    }

    renderWithOutValidations = () => (
        <DateTime
            value={this.props.value}
            inputProps={{
                className: this.props.inputClassName,
                placeholder: this.props.placeholder
            }}
            onChange={this.handleChange}
            timeFormat={false}
            utc={true}
            locale={this.props.locale}
            dateFormat={this.props.format}
            isValidDate={this.shouldValidateDisabledDates() ? this.isValidDate : undefined}
        />
    )

    render() {
        return (
            this.props.validators ? this.renderWithValidations() : this.renderWithOutValidations()
        );
    }
}
