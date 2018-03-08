import * as React from 'react';

interface TraceIconProps {
    onClick: (id: string | number, object: string) => void;
    id: string | number;
    object: string;
}

export default function TraceIcon(props: TraceIconProps) {

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const { id, object, onClick } = props;
        event.stopPropagation();
        onClick(id, object);
    };

    return (
        <a onClick={handleClick}>
            <i className="icon-history" />
        </a>
    );
}