import * as React from 'react';
import { Alert } from 'react-bootstrap';

export default function() {
    return (
        <div className="container">
            <Alert bsStyle="warning">
            <h4>Not found</h4>
            <p>
                The page you're looking for could not be found.
            </p>
            <p>
                <a href="https://www.elduendemall.com/" className="button">Go back home.</a>
            </p>
            </Alert>
        </div>
    );
}
