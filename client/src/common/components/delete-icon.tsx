import * as React from 'react';

interface DeleteProps {
    onDelete: (id: string | number, extra?: object) => void;
    id: string | number;
    extra?: object;
}

export default function DeleteIcon(props: DeleteProps) {

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        props.onDelete(props.id, props.extra);
    };

    return (
        <a onClick={onClick}>
            <i className="icon-delete" />
        </a>
    );
}