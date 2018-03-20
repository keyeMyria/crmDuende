import * as React from 'react';
import { Modal } from 'react-bootstrap';
import './dialog.css';

export interface DialogProps {
    content: string | JSX.Element;
    contentValues?: {};
    type?: 'confirm' | 'alert';
    dismissible?: boolean;
    show?: boolean;
    extra?: any;
    title?: string;
    titleValues?: {};
    confirmButtonText?: string;
    declineButtonText?: string;
    icon?: JSX.Element | string;
    iconContainerClass?: string;
    status?: 'warning';
    onResponse(response: boolean, extra?: any): void;
    onDismiss?(): void;
}

export function Dialog(props: DialogProps) {

    const onHide = () => {
        if (props.dismissible && props.onDismiss) {
            props.onDismiss();
        }
    };

    const onResponse = (event: React.MouseEvent<HTMLDivElement>) => {
        props.onResponse(event.currentTarget.id === 'confirm', props.extra);
    };

    const renderIcon = () => (
        <div className={`row d-icon ${props.iconContainerClass} ${props.status && 'd-warning'}`}>
            {
                props.status ? (
                    <i className={'icon-error'} />
                ) : (
                        typeof props.icon === 'string'
                            ? <i className={props.icon} />
                            : props.icon
                    )
            }
        </div>
    );

    const renderDialogTitle = () => (
        <div className="row d-text-container">
            {props.title || '' + props.titleValues}>
                {
                (text: string) => (
                    <label className="d-title">
                        {text}
                    </label>
                )
            }
        </div>
    );

    const renderIntlText = (id: string) => (
        <div>
            {id + props.contentValues}>
            {
                (text: string) => (
                    <label className="d-content">
                        {text}
                    </label>
                )
            }
        </div>
    );

    const renderDialogText = () => (
        <div className="row d-text-container">
            {typeof props.content === 'string' ? renderIntlText(props.content) : props.content}
        </div>
    );

    const renderConfirmButton = () => (
        <div id="confirm" className="btn btn-primary" onClick={onResponse}>
            {props.confirmButtonText || 'Confirmar'}
        </div>
    );

    const renderDeclineButton = () => (
        <div id="dialog" className="btn btn-default" onClick={onResponse}>
            {props.declineButtonText || 'Cancelar'}
        </div>
    );

    const renderAlertActions = () => (
        <div className="row" style={{ textAlign: 'center' }}>
            {renderConfirmButton()}
        </div>
    );

    const renderConfirmActions = () => (
        <div className="row d-text-container">
            {renderDeclineButton()}&nbsp;{renderConfirmButton()}
        </div>
    );

    const renderModal = () => (
        <Modal show={props.show} onHide={onHide} backdropClassName="dialog-backdrop" >
            <Modal.Body>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            {(!!props.icon || props.status) && renderIcon()}
                        </div>
                        {!!props.title && renderDialogTitle()}
                        {renderDialogText()}
                        {props.type === 'alert' ? renderAlertActions() : renderConfirmActions()}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );

    const render = () => (
        <div className="cm-context">
            {renderModal()}
        </div>
    );

    return render();
}