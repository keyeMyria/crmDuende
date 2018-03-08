import * as React from 'react';
import './toggle-selector.css';

interface ToggleSelectorOption {
    value: ToggleSelectorValue;
    label: string | JSX.Element;
}

export type ToggleSelectorValue = string | number;

export type ToggleSelectorOptions = [ToggleSelectorOption, ToggleSelectorOption];

export interface ToggleSelectorProps {
    options: ToggleSelectorOptions;
    value: ToggleSelectorValue;
    containerClass?: string;
    onChange(value: ToggleSelectorValue): void;
}

export function ToggleSelector(props: ToggleSelectorProps) {
    const [leftOption, rigthOption] = props.options;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        props.onChange(event.currentTarget.id === 'left' ? leftOption.value : rigthOption.value);
    };

    return (
        <div className={`ts-container ${props.containerClass && props.containerClass}`}>
            <div
                className={`ts-left-option ${props.value === leftOption.value && 'ts-selected-option'}`}
                onClick={handleClick}
                id="left"
            >
                {leftOption.label}
            </div>
            <div
                className={`ts-rigth-option ${props.value === rigthOption.value && 'ts-selected-option'}`}
                onClick={handleClick}
                id="rigth"
            >
                {rigthOption.label}
            </div>
        </div>
    );
}
