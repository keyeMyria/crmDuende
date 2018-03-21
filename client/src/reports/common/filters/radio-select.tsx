import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export type RadioValue = string | number;
export type RadioOption = { 
  [value: string]: string,
  [value2: number]: string
};

export interface RadioSelectProps {
  options: RadioOption;
  value?: RadioValue;
  valueName?: string;
  onChange(value: RadioValue, valueName?: string): void;
}

export function RadioSelect(props: RadioSelectProps) {

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.id;
    props.onChange(value, props.valueName);
  };

  const renderOption = (option: string) => (
    <span key={`rs-${option}`} style={{lineHeight: '34px'}}>
      <label className="label-checkbox">
      <input type="radio" id={`${option}`} checked={`${option}` === `${props.value}`} onChange={handleClick} />&nbsp;
        <FormattedMessage id={props.options[option]}>
        {(text: string) => (
            <label htmlFor={`${option}`}> {text}</label>
        )}
      </FormattedMessage>
    </label>
    </span>
  );

  const renderOptions = (options: RadioValue[]) => <div>{options.map(renderOption)}</div>;
  return renderOptions(Object.keys(props.options));

}
