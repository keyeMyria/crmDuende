import * as React from 'react';
import '../resources/styles/modal-field.css';
import { Validator } from './input-validation';
import DateValidation from './input-validation/date-validation';

interface ModalDateProps {
    labelText?: string;
    onChange: (change: string, valueName?: string) => void;
    valueName?: string;
    isRequired?: boolean;
    inputWarning?: boolean;
    validators?: Validator[];
    labelClassNames?: string;
    inputClassNames?: string;
    value?: Date;
    locale?: string;
    format?: string;
    disabled?: boolean; 
}

export default function ModalDate(props: ModalDateProps) {

    const {
        labelText = 'LABEL',
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
                    {labelText}
                </label>
            </div>
            <div className={`${inputClassNames} form-group`}>
                <DateValidation
                    inputClassName={`form-control ${props.inputWarning ? 'modal-field-warning' : ''}`}
                    value={props.value}
                    onInputChange={onInputChange}
                    validators={validators}
                    labelKey={labelText}
                    locale={props.locale}
                    format={props.format}
                    disabled={props.disabled}
                />
            </div>
        </div>
    );
}
