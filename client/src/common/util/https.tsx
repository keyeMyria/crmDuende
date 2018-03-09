import 'whatwg-fetch';
import * as React from 'react';
import MessageStore from '../components/context-message/context-message-store';
import { FormattedMessage } from 'react-intl';
import * as download from 'downloadjs';

const postRequest: RequestInit = {
    method: 'POST',
    credentials: 'same-origin'
};

const getRequest: RequestInit = {
    method: 'GET',
    credentials: 'same-origin'
};

export enum STATUS {
    OK = 200,
    LOGGED_OUT = 401,
    WITHOUT_PERMISSIONS = 403,
    BAD_REQUEST = 400,
    SKELETON_ERROR = 500
}

export class Https {

    contextMessageStore: MessageStore;

    constructor(messageStore: MessageStore) {
        this.contextMessageStore = messageStore;
    }

    post = async (url: string, body: object): Promise<any> => {
        try {
            const response = await fetch(url, {
                ...postRequest,
                body
            });
            return this.manageResponse(response);
        } catch (error) {
            this.showNoInternetMessage();
            return { success: false };
        }
    }

    get = async (url: string): Promise<any> => {
        try {
            const response = await fetch(url, getRequest);
            return this.manageResponse(response);
        } catch (error) {
            this.showNoInternetMessage();
            return { success: false };
        }
    }

    download = (url: string) => {
        download(url);
    }

    redirect = (url: string, data?: {}) => {
        if (data) {
            this.redirectWithPost({ url, data });
        } else {
            window.location.href = url;
        }
    }

    redirectWithPost = ({ url, data }: { url: string, data: {} }) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.style.display = 'none';
        document.body.appendChild(form);
        Object.keys(data).forEach(
            key => {
                if (data[key]) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = data[key];
                    form.appendChild(input);
                }
            }
        );
        form.submit();
    }

    manageResponse = async (response: Response) => {
        try {
            if (response.status === STATUS.OK) {
                return response.json();
            } else if (response.status === STATUS.LOGGED_OUT) {
                this.contextMessageStore.alert({
                    content: 'No tiene sesión',
                    title: 'Sessión ha expirado',
                    onResponse: this.doLoginAndReturn,
                    status: 'warning'
                });
                return response;
            } else if (response.status === STATUS.WITHOUT_PERMISSIONS) {
                this.contextMessageStore.add(this.renderMessage('Error interno del servidor'), 'error');
                return { success: false };
            } else if (response.status === STATUS.BAD_REQUEST) {
                const res = await response.json();
                this.contextMessageStore.add(this.renderMessage('Error interno del servidor'), 'error');
                const errors = this.errorsArrayToJSON(res.errors);
                return { success: false, status: STATUS.BAD_REQUEST, errors };
            } else if (response.status === STATUS.BAD_REQUEST || response.status === STATUS.SKELETON_ERROR) {
                this.contextMessageStore.add(this.renderMessage('Error interno del servidor '), 'error');
                return { success: false };
            } else {
                this.contextMessageStore.add(this.renderMessage('Error interno del servidor'), 'error');
                return { success: false };
            }
        } catch (error) {
            this.contextMessageStore.add(this.renderMessage('Error interno del servidor'), 'error');
        }
    }

    doLoginAndReturn = () => {
        this.redirect(`/login.php?redirect=${window.location.pathname}`);
    }

    errorsArrayToJSON = (array: { key: string, error: string }[]) => {
        const json = {};
        array.forEach(element => {
            json[element.key] = element.error;
        });
        return json;
    }

    private showNoInternetMessage = () => {
        this.contextMessageStore.add(this.renderMessage('No tiene internet'), 'warning');
    }

    private renderMessage = (id: string): JSX.Element => (
        <FormattedMessage id={id}>
            { // tslint:disable-next-line:jsx-no-multiline-js
                (text: string) => (
                    <label>{text}</label>
                )}
        </FormattedMessage>)
}
