import * as React from 'react';
import MultiSelect from './multi-select';
import MultiSelectProps from '../types/multi-select-props';
interface ModalMultiSelectProps extends MultiSelectProps {
    labelText?: string;
}

export default function ModalMultiSelect(props: ModalMultiSelectProps) {

    const {
        labelText = 'LABEL',
        valueKey,
        labelKey,
        placeholder,
        valueName,
    } = props;

    const handleChange = (change: string[], name: string) => {
        props.onSelectChange(change, name);
    };

    return (
        <div className="row">
            <div className="col-sm-3 veh-general-form-label">
                <label>
                    {labelText}
                </label>
            </div>
            <div className="col-sm-9 form-group">
                <MultiSelect
                    onSelectChange={handleChange}
                    selectedOptions={props.selectedOptions}
                    options={props.options}
                    valueKey={valueKey}
                    labelKey={labelKey}
                    placeholder={placeholder}
                    valueName={valueName}
                    valueRenderer={props.valueRenderer}
                    optionRenderer={props.optionRenderer}
                    disabled={props.disabled}
                />
            </div>
        </div>
    );
}