import * as React from 'react';

export interface TitleProps {
    title?: string | JSX.Element;
    class?: string;
    // tslint:disable-next-line:no-any
    children?: any;
}

export function Title(props: TitleProps) {
    return (
        <div className={`card-title ${props.class && props.class}`}>
            {props.title}
            {props.children}
        </div>
    );
}
