import * as React from 'react';
import ReactToggle from 'react-toggle';

export interface ToggleProps {
    checked: boolean;
    disabled?: boolean;
    onClick(checked: boolean): void;
}

export default function Toggle(props: ToggleProps) {

    const handleClick = () => { props.onClick(!props.checked); };

    return (
        <div className="ct-container">
            <ReactToggle
                icons={false}
                onChange={handleClick}
                checked={props.checked}
                disabled={props.disabled}
            />
        </div>
    );
}
