import * as React from 'react';
import '../../resources/styles/modal-field.css';
export interface ModalGenericProps {
    labelText?: string;
    isRequired?: boolean;
    autoTranslate?: boolean;
    labelClassNames?: string;
    inputClassNames?: string;
    children?: JSX.Element;
}

export default class ModalGeneric extends React.Component<ModalGenericProps> {

    getLabel = () => this.props.autoTranslate ? (
        <div>
            {this.props.labelText || ''}
            {(text: string) => (
                <label className={this.props.isRequired ? 'required-modal-field' : ''}>
                    {text}
                </label>
            )}

        </div>
    )
        : (
            <label className={this.props.isRequired ? 'required-modal-field' : ''}>
                {this.props.labelText}
            </label>)
    render() {
        return (
            <div className="row">
                <div className={`${this.props.labelClassNames || 'col-sm-3'} veh-general-form-label`}>
                    {this.getLabel()}
                </div>
                <div className={`${this.props.inputClassNames || 'col-sm-9'} form-group`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}