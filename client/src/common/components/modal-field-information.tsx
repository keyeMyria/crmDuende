import * as React from 'react';

interface ModalFieldInformationProps {
    informationText?: string;
    labelText?: string;
    hideOnNull?: boolean;
    autoFocus?: boolean; 
    labelClassNames?: string;
    inputClassNames?: string;
}

export default function ModalFieldInformation(props: ModalFieldInformationProps) {

    const {
        labelText = 'LABEL',
        informationText
    } = props;

    const render = () => (
        <div className="row">
            <div className={`${props.labelClassNames || 'col-sm-3'} veh-general-form-label`}>
                <label>
                    {labelText || '\xa0'}:
                </label>
            </div>
            <div className={`${props.inputClassNames || 'col-sm-9'} form-group`}>
                <label>
                    {informationText}
                </label>
            </div>
        </div>
    );

    if (props.hideOnNull && (!informationText || informationText.trim() === '')) {
        return <span/>;
    } else {
        return render();
    }
}