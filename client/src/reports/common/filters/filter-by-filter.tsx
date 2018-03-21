import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const FILTER_BY = ['veh', 'driver'];

interface FilterByProps {
    value: string;
    valueName?: string;
    onChange(newValue: string): void;
}

export function FilterBy (props: FilterByProps) {

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.currentTarget.id);
    };

    const getIntlID = (type: string) => {
        return 'common.filter_by.' + type;
    };

    const renderType = (type: string) => (
        <label key={`rt-${type}`} className="label-checkbox" htmlFor={type}>
            <input type="radio" id={type} checked={type === props.value} onChange={handleOnChange} />&nbsp;
            <FormattedMessage id={getIntlID(type)}>
                {(text: string) => (
                    <label htmlFor={type}>{text}</label>
                )}
            </FormattedMessage>
        </label>
    );

    return (
        <span style={{lineHeight: '34px'}}>
            {FILTER_BY.map( type => renderType(type))}
        </span>
    );
}
