import UsersManager from './routes/';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../common/resources/styles/styles.css';

export default UsersManager;

ReactDOM.render(
    <UsersManager />,
    document.getElementById('root') as HTMLElement
);
