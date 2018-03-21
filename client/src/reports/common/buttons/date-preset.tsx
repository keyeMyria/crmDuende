import * as React from 'react';
import { FormattedMessage } from 'react-intl';

type Range = [Date, Date];

export interface DatePresetProps {
    intlId: string;
    range: Range;
    isLast?: boolean;
    isSelected?: boolean;
    onClick(range: Range): void;
}

export function DatePreset(props: DatePresetProps) {

    const handleClick = () => {
        const value: [Date, Date] = props.isSelected ? [new Date(), new Date()] : props.range;
        props.onClick(value);
    };

    const buttonStyle = props.isLast ? 'preset-button-border' : 'preset-button';

    const selectedStyle = props.isSelected ? 'selected-preset' : '';

    const classNames = `${buttonStyle} ${selectedStyle}`;

    return (
        <FormattedMessage id={props.intlId}>
            {(text: string) => (
                <div className={classNames} onClick={handleClick}>{text}</div>
            )}
        </FormattedMessage>
    );
}
