import * as React from 'react';
import { observer } from 'mobx-react';
import Message from './context-message';
import MessageStore from './context-message-store';
import AlertContainer from 'react-alert';
import MessageContainer from './message-container';
import { Dialog } from '../dialogs/dialog';
import './context-message.css';

export interface ContextualMessagesProps {
  messages: Message[];
  store: MessageStore;
}

@observer
export default class ContextualMessages extends React.Component<ContextualMessagesProps> {

  msg: AlertContainer;

  componentWillReceiveProps(nextProps: ContextualMessagesProps) {
    if (this.isSomeChange(nextProps.messages, this.props.messages)) {
      const messages = this.filterChanged(nextProps.messages, this.props.messages);
      this.showAlerts(messages);
    }
  }

  filterChanged = (messages: Message[], compareTo: Message[]) => {
    const compareToIds = compareTo.map(message => message.id);
    return messages.filter(message => !compareToIds.includes(message.id));
  }

  isSomeChange = (messages: Message[], compareTo: Message[]) => {
    const listA = messages.map(message => message.id);
    const listB = compareTo.map(message => message.id);
    return listA.some(id => !listB.includes(id));
  }

  setMsg = (ref: any) => {
    this.msg = ref;
  }

  onDialogResponse = (response: boolean, extra?: any) => {
    this.props.store.dialog.onResponse(response, extra);
    this.props.store.completeDialog();
  }

  onDialogDismiss = () => {
    this.props.store.completeDialog();
  }

  onCloseAlert = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    this.msg.removeAlert(event.currentTarget.id);
    this.props.store.delete(event.currentTarget.id);
  }

  showAlerts = (messages: Message[]) => {
    messages.map(
      message => {
        this.msg.show(
          this.renderContextMessage(message), {
            time: message.type === 'error' ? 0 : 5000,
            id: message.id
          }
        );
      }
    );
  }

  renderContextMessage = (message: Message) => (
    <MessageContainer message={message} onCloseAlert={this.onCloseAlert} renderIcon={this.renderIcon} />
  )

  renderIcon = (type: Message['type']) => {
    if (type === 'success') {
      return <i className="icon-check css-icon-msg" />;
    } else if (type === 'warning') {
      return <i className="icon-warning css-icon-msg" />;
    } else {
      return <i className="icon-error_outline css-icon-msg" />;
    }
  }

  render() {
    return (
      <div>
        <AlertContainer
          theme="light"
          position="top right"
          ref={this.setMsg}
        />
        {!!this.props.store.dialog.show && (
          <Dialog {...this.props.store.dialog} onResponse={this.onDialogResponse} onDismiss={this.onDialogDismiss} />
        )}
      </div>
    );
  }
}