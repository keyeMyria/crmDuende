import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import './modal-header.css';
// const warningIcon = require('./icons/warning.svg') as string;
// const errorIcon = require('./icons/error.svg') as string;

enum CLASSNAMES { warning = 'mt-warning', error = 'mt-error' }

export interface ModalHeaderProps {
    title: string;
    closeButton: boolean;
    values?: {};
    message?: string;
    showMessage?: boolean;
    messageType?: 'warning' | 'error';
}

export function ModalHeader(props: ModalHeaderProps) {

    const titleClassName = (): string => props.messageType ?
        CLASSNAMES[props.messageType] : '';

    // const getIcon = () => {
    //     switch (props.messageType) {
    //         case 'warning':
    //             return warningIcon;
    //         case 'error':
    //             return errorIcon;
    //         default:
    //             return '';
    //     }
    // };

    const renderMessage = () => (
        props.showMessage ? (
            <div className={titleClassName()}>
                <FormattedMessage
                    id={props.message || ''}
                />
            </div>
        ) : <div />
    );

    const render = () => (
        <div>
            <Modal.Header
                bsClass={props.showMessage ? 'modal-header' : 'modal-header'}
                closeButton={props.closeButton}
            >
                <Modal.Title>
                    {/* {props.showMessage ? <img src={getIcon()} /> : ''} */}
                    <FormattedMessage
                        id={props.title}
                        values={props.values}
                    />
                </Modal.Title>
            </Modal.Header>
            {props.showMessage ? renderMessage() : ''}
        </div>
    );
    return render();
}
