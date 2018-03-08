import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

interface ConfirmProps {
}

export default class Confirm extends React.Component<ConfirmProps> {

    onHide = () => { return; };

    onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        window.location.replace(`${window.location.origin}/login.php?redirect=${window.location.pathname}`);
    }

    render() {
        return (
            <Modal show={true} onHide={this.onHide}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <FormattedMessage id="global.http_errors.logged_out" />
                            </div>
                            <div className="row" style={{ textAlign: 'right' }}>
                                <div className="btn btn-primary" onClick={this.onClick}>
                                    <FormattedMessage id="global.http_errors.login" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}