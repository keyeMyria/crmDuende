import * as React from 'react';

export interface ActionsRowProps {
    children?: any;
}

export function ActionsRow(props: ActionsRowProps) {
    return (
        <div className="row">
            <div className="col-sm-offset-2 col-sm-10 col-md-8 col-lg-6 col-xs-12">
                <div className="btn-reports">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
