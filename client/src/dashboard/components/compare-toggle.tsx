import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Toggle from '../../common/components/toggle';
import '../../common/components/toggle/cellphones.css';
import '../styles/compare-toggle.css';

export interface CompareToggleProps {
    range: string;
    checked: boolean;
    onChange(check: boolean): void;
}

export function CompareToggle (props: CompareToggleProps) {
    return (
      <div className="ct-container">
        <FormattedMessage id="compare_to_previous" values={{range: props.range}} />:&nbsp;&nbsp;
        <Toggle checked={props.checked} onClick={props.onChange} />
      </div>
    );
}
