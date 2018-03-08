import * as React from 'react';
import InputValidation, { Validator } from './input-validation';
import '../resources/styles/modal-field.css';

export interface ModalFieldProps {
    inputPlaceholder?: string;
    inputValue?: string;
    labelText?: string;
    onChange: (change: string, valueName?: string) => void;
    externalErrors?: {[valueKey: string]: string};
    valueName?: string;
    isRequired?: boolean;
    inputWarning?: boolean;
    validators?: Validator[];
    forceVerify?: boolean;
    inputType?: string;
    labelClassNames?: string;
    inputClassNames?: string;
    onChangeError?: (valueKey: string, error?: string | JSX.Element | null) => void;
    autoFocus?: boolean;
    verifyOnChange?: string;
    messageError?: string;
    disabled?: boolean;
}

export default function ModalField(props: ModalFieldProps) {

    const {
        labelText = 'LABEL',
        inputValue = '',
        inputPlaceholder = '',
        validators = [],
        labelClassNames = 'col-sm-3',
        inputClassNames = 'col-sm-9'
    } = props;

    const onInputChange = (inputChange: string) => {
        const { onChange, valueName } = props;
        onChange(inputChange, valueName);
    };

    return (
        <div className="row">
            <div className={`${labelClassNames} veh-general-form-label`}>
                <label className={props.isRequired ? 'required-modal-field' : ''}>
                    {labelText}:
                </label>
            </div>
            <div className={`${inputClassNames} form-group`}>
                <InputValidation
                    inputClassName={`form-control ${props.inputWarning ? 'modal-field-warning' : ''}`}
                    value={inputValue}
                    onInputChange={onInputChange}
                    placeholder={inputPlaceholder}
                    validators={validators}
                    labelKey={labelText}
                    valueKey={props.valueName}
                    type={props.inputType}
                    onChangeError={props.onChangeError}
                    forceVerify={props.forceVerify}
                    autoFocus={props.autoFocus}
                    verifyOnChange={props.verifyOnChange}
                    externalErrors={props.externalErrors}
                    messageError={props.messageError}
                    disabled={props.disabled}
                />
            </div>
        </div>
    );
}