import * as React from 'react';
import InputValidation, { Validator } from './input-validation';
import '../resources/styles/modal-field.css';
import OneSelectProps from '../types/select-props';
import Select from './select/index';
import { FormGroup, InputGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export interface ModalButtonProps extends OneSelectProps {
    inputPlaceholder?: string;
    inputValue?: string;
    labelText?: string;
    onChange: (change: string, valueName?: string) => void;
    inputName?: string;
    externalErrors?: {[valueKey: string]: string};
    isRequired?: boolean;
    inputWarning?: boolean;
    validators?: Validator[];
    inputType?: string;
    labelClassNames?: string;
    inputClassNames?: string;
    selectedValue?: string;
    forceVerify?: boolean;
    verifyOnChange?: string;
    autoFocus?: boolean;
    messageError?: string;
    disabled?: boolean; 
    readOnly?: boolean; 
    id?: string; 
    onChangeError?: (valueKey: string, error?: string | JSX.Element | null) => void;
}

export default function ModalButton(props: ModalButtonProps) {
    const {
        labelText = 'LABEL',
        inputValue = '',
        inputPlaceholder = '',
        validators = [],
        labelClassNames = 'col-sm-3',
        valueKey,
        labelKey,
        placeholder,
        options,
        valueName = ''
    } = props;

    const onInputChange = (inputChange: string) => {
        const { onChange, inputName } = props;
        onChange(inputChange, inputName);
    };
    const handleChange = (change: string, name: string) => {
        props.onSelectChange(change, name);
    };

    const isEditing = () => ( props.id !== '-1'); 

    return (
        <div className="row">
            <div className={`${labelClassNames} veh-general-form-label`}>
                <label className={props.isRequired ? 'required-modal-field' : ''}>
                    {labelText}
                </label>
            </div>
            <div className="col-sm-7 form-group full-width-input">
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Select
                                handleChange={handleChange}
                                value={props.selectedOption}
                                options={options}
                                valueKey={valueKey}
                                labelKey={labelKey}
                                placeholder={placeholder}
                                valueName={valueName}
                                disabled={props.disabled}
                            /></InputGroup.Addon>
                        <InputValidation
                            inputClassName={`form-control ${props.inputWarning ? 'modal-field-warning' : ''}`}
                            value={inputValue}
                            onInputChange={onInputChange}
                            placeholder={inputPlaceholder}
                            validators={validators}
                            labelKey={labelText}
                            type={props.inputType}
                            valueKey={props.valueName}
                            onChangeError={props.onChangeError}
                            forceVerify={props.forceVerify}
                            autoFocus={props.autoFocus}
                            verifyOnChange={props.verifyOnChange}
                            messageError={props.messageError}
                            externalErrors={props.externalErrors}
                            readOnly={props.readOnly}
                        />
                    </InputGroup>
                    {!isEditing() &&
                        <label className="sms-message">
                            <FormattedMessage id="cellphone_modal.message_sms" />
                        </label>
                    }
                </FormGroup>
            </div>
        </div>
    );
}