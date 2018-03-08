import * as React from 'react';
const Select: NodeRequire = require('react-select');
import MultiSelectProps from '../types/multi-select-props';
import '../resources/styles/react-select.css';
import { FormattedMessage } from 'react-intl';

export default function MultiSelect(props: MultiSelectProps) {

    const handleChange = (newSelectedOptions: string) => {
        const { onSelectChange, valueName = '' } = props;
        const change = newSelectedOptions.length > 0
            ? newSelectedOptions.split(',')
            : [];
        onSelectChange(change, valueName);
    };

    // tslint:disable-next-line:no-any
    const onBlur = (event: any) => {
        event.stopPropagation();
        if (props.onBlur) { props.onBlur(); }
    };

    const { selectedOptions, options, labelKey, valueKey, placeholder } = props;
    return (
        <Select
            multi={true}
            simpleValue={true}
            value={selectedOptions}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            onChange={handleChange}
            placeholder={<FormattedMessage id={placeholder || 'global.choose'} />}
            valueRenderer={props.valueRenderer}
            optionRenderer={props.optionRenderer}
            isLoading={props.isLoading}
            onBlur={onBlur}
            tabSelectsValue={false}
            onClose={props.onClose}
            disabled={props.disabled}
        />
    );
}