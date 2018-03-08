import * as React from 'react';
import Select, { CustomSelectProps } from '../select';

export interface ModalSelectProps extends CustomSelectProps {
    labelText?: string | JSX.Element;
    labelClassNames?: string;
    inputClassNames?: string;
    isRequired?: boolean;
}

export default function ModalSelect(props: ModalSelectProps) {

    const {
        labelText = 'LABEL',
        labelClassNames = 'col-sm-3',
        inputClassNames = 'col-sm-9'
         } = props;
    
    const handleChange = (change: string, name: string) => {
        props.handleChange(change, name);
    };

    return (
        <div className="row">
            <div className={`${labelClassNames} veh-general-form-label`}>
                <label className={props.isRequired ? 'required-modal-field' : ''}>
                    {labelText}:
                </label>
            </div>
            <div className={`${inputClassNames} form-group`}>
                <Select {...props} handleChange={handleChange} />
            </div>
        </div>
    );
}
