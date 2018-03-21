import * as React from 'react';
import { Validator } from '../../../common/components/input-validation/index';
import DateValidation from '../../../common/components/input-validation/date-validation';
import { parse } from 'date-fns';

interface DateFilterProps {
    labelText?: string;
    onChange: (change: string, valueName?: string) => void;
    valueName?: string;
    isRequired?: boolean;
    inputWarning?: boolean;
    validators?: Validator[];
    labelColWidth?: string;
    inputColWidth?: string;
    disableBeforeTo?: Date;
    disableAfterTo?: Date;
    value?: Date;
    locale?: string;
    format?: string;
    disabled?: boolean;
}

export default function DateFilter(props: DateFilterProps) {

    const {
        labelText = 'LABEL',
        validators = [],
    } = props;

    const onInputChange = (dateTime: string) => {
        const { onChange, valueName } = props;
        const date = dateTime.split('T')[0];
        onChange(date, valueName);
    };

    return (
        <div className="form-group">
                <DateValidation
                    inputClassName={`form-control ${props.inputWarning ? 'df-warning' : ''}`}
                    value={props.value}
                    onInputChange={onInputChange}
                    validators={validators}
                    labelKey={labelText}
                    locale={props.locale}
                    format={props.format}
                    disabled={props.disabled}
                    disableAfterTo={props.disableAfterTo ? parse(props.disableAfterTo) : undefined}
                    disableBeforeTo={props.disableBeforeTo ? parse(props.disableBeforeTo) : undefined}
                />
        </div>
    );
}
