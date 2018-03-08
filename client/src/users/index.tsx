import UsersManager from './routes/';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../common/resources/styles/styles.css';
declare global {
    interface Window {
        // tslint:disable-next-line:no-any
        MountUsersManager: (idElement: string) => any;
    }
}

export default UsersManager;

window.MountUsersManager = (idElement: string) => {
    ReactDOM.render(
        <UsersManager />,
        document.getElementById(idElement) as Element
    );
};