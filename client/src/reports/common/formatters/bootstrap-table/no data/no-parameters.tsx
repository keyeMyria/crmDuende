import * as React from 'react';
import '../../../resources/styles/no-params.css';
export interface NoParamsProps {
}

export default function NoParams(props: NoParamsProps) {
    return (
        <div className="alert alert-danger">
            <p className="title">
                <i className="icon-error" /> &nbsp;
                No se encuentran resultados
            </p>
        </div>
    );
}