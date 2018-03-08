import * as React from 'react';
import User from '../../users-manager/types/user';
interface PasswordIconProps {
    onClick: (user: User) => void;
    user: User;
}

export default function PassowordIcon(props: PasswordIconProps) {

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const { user, onClick } = props;
        event.stopPropagation();
        onClick(user);
    };

    return (
        <a onClick={handleClick}>
            <i className="icon-key" style={{fontSize: '16px'}} />
        </a>
    );
}