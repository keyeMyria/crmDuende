import * as React from 'react';
import { Route, Link } from 'react-router-dom';

interface NavTabProps {
    to: string;
    className?: string;
    activeClassName?: string;
    // tslint:disable-next-line:no-any
    [name: string]: any;
}

export default function (props: NavTabProps) {
    let { to, exact, strict, className, activeClassName, ...rest } = props;
    return (
        <Route
            path={to}
            exact={true}
            children={({ match }) => {
                let isActive = !!match;
                return (
                    <li
                        className={isActive ? [className, activeClassName].filter(i => i).join(' ') : className}
                    >
                        <Link to={to} {...rest} />
                    </li>
                );
            }}
        />
    );
}