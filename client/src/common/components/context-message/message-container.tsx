import * as React from 'react';
import Message from './context-message';

export interface MessageContainerProps {
    message: Message;
    renderIcon(type: Message['type']): JSX.Element;
    onCloseAlert(event: React.MouseEvent<HTMLLIElement>): void;
}

export default function MessageContainer(props: MessageContainerProps) {
    return (
        <div className={`row css-msg-container css-${props.message.type}`}>
            <div className="css-icon-cont">
                {props.renderIcon(props.message.type)}
            </div>
            <div className="notification-text">
                {props.message.message}
            </div>
            <div className="css-close-cont">
                <i className="icon-close css-icon-msg" id={props.message.id} onClick={props.onCloseAlert} />
            </div>
        </div>
    );
}