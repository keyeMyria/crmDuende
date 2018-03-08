import { observable, action } from 'mobx';
import Message, { AlertType } from './context-message';
import { DialogProps } from '../dialogs/dialog';
import * as shortId from 'shortid';

export default class ContextMessageStore {
    @observable messages: Message[] = [];
    @observable dialog: DialogProps = {} as DialogProps;

    @action
    add = (message: string | JSX.Element, type: AlertType) => {
        this.messages = this.messages.concat({
            message,
            type,
            id: shortId.generate()
        });
    }

    @action
    delete = (id: string | JSX.Element) => {
        this.messages = this.messages.filter(message => message.id !== id);
    }

    @action
    alert = (options: DialogProps) => {
        this.dialog = {
            type: 'alert',
            show: true,
            ...options
        };
    }

    @action
    confirm = (options: DialogProps) => {
        this.dialog = {
            type: 'confirm',
            show: true,
            ...options
        };
    }

    @action
    completeDialog = () => { this.dialog = {} as DialogProps; }
}