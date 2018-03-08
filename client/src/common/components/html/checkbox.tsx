import * as React from 'react';
import './checkbox.css';

export type CHECK_TYPE = 'checkbox' | 'radio';

export interface CheckboxProps {
    isSelected: boolean;
    valueName?: string;
    disabled?: boolean;
    className?: string;
    iconClass?: string;
    props?: React.HTMLAttributes<HTMLLIElement>;
    type?: CHECK_TYPE;
    onChange(shouldSelect: boolean, valueName?: string): void;
}

const ICONS = {
    box: {
        checked: 'icon-check_box',
        unchecked: 'icon-check_box_outline_blank'
    },
    radio: {
        checked: 'icon-radio_button_checked',
        unchecked: 'icon-radio_button_unchecked'
    }
};

export default function Checkbox (props: CheckboxProps) {

    const { type = 'box' } = props;
    
    const enableClass = () => props.disabled ? 'disabled' : 'enable';

    const iconClass = () => props.isSelected ? ICONS[type].checked : ICONS[type].unchecked;
    
    const onClick = (event: React.MouseEvent<HTMLLIElement>) => {
        event.stopPropagation();
        props.onChange(!props.isSelected, props.valueName);
    };

    const render = () => (
        <i
            {...props.props}
            className={`checkbox ${enableClass()} ${props.iconClass || iconClass()} ${props.className}`}
            onClick={props.disabled ? undefined : onClick}
        />
    );

    return render();
}
