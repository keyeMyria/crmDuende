import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../resources/styles/no-params.css'; 
export interface NoParamsProps {
}

export default function NoParams(props: NoParamsProps) {
    return (
        <div className="alert alert-danger">
            <p className="title">
                <i className="icon-error" /> &nbsp;
                <FormattedMessage id={'global.no_results_found'} />
            </p>
        </div>
    );
}