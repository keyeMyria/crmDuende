import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export type CheckValue = string;
export type CheckOption = {
  [value: string]: string
};

export interface CheckboxSelectProps {
  options: CheckOption;
  value?: CheckValue | CheckValue[];
  valueName?: string;
  defaultChecked?: boolean; 
  onChange(value: string[], valueName?: string): void;
}

export function CheckboxSelect(props: CheckboxSelectProps) {

  const value: string[] = props.value ? ([] as string[]).concat(props.value) : [];

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.currentTarget.id;
    if (value.includes(option)) {
      props.onChange(value.filter(val => `${val}` !== option), props.valueName);
    } else {
      props.onChange(value.concat(option), props.valueName);
    }
  };

  const isChecked = (option: string) => {
    if (props.defaultChecked) { return true; }
    if (value.length > 0) { return value.includes(option); }
    return false;
  };

  const renderOption = (option: CheckValue) => (
    <div key={`rs-${option}`} className="label-checkbox" style={{lineHeight: '34px'}}>
      <input type="checkbox" id={`${option}`}  onChange={handleClick} defaultChecked={isChecked(option)}/>&nbsp;
      <FormattedMessage id={props.options[option]}>
        {(text: string) => (
          <label htmlFor={`${option}`}>{text}</label>
        )}
      </FormattedMessage>
    </div>
  );

  const renderOptions = (options: CheckValue[]) => <div className="days-container">{options.map(renderOption)}</div>;
  return renderOptions(Object.keys(props.options));

}
