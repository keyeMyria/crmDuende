import * as React from 'react';
import Select, { ReactSelectProps, Option } from 'react-select';
import './select.css';

export interface CustomSelectProps extends ReactSelectProps {
  valueName?: string;
  autoTranslate?: boolean;
  handleChange(value: Option['value'] | Option['value'][], valueName?: string): void;
}

export default function CustomSelect(props: CustomSelectProps) {

  const { valueKey = 'value', clearable = false, labelKey = 'label' } = props;

  const onChange = (value: Option) => {
    if (!!value) {
      if (Array.isArray(value)) {
        const values = value.map((val: Option) => val[valueKey]);
        props.handleChange(values, props.valueName);
      } else {
        props.handleChange(value[valueKey], props.valueName);
      }
    } else {
      if (props.multi) { props.handleChange([], props.valueName);
      } else { props.handleChange( '' , props.valueName); }
    }
  };

  const renderTranslate = (option: Option) => <span> {option[labelKey]} </span>;

  return (
    <Select
      optionRenderer={props.autoTranslate ? renderTranslate : undefined}
      valueRenderer={props.autoTranslate ? renderTranslate : undefined}
      {...props}
      onChange={onChange}
      tabSelectsValue={false}
      closeOnSelect={!props.multi}
      clearable={clearable}
    />
  );
}
