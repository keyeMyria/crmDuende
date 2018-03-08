import * as React from 'react';

enum CELLPHONE_ICON {
    'icon-apple' = 1,
    'icon-android',
}

export default function CellphoneIconFormat(cellType: string) {
    return (
        <div className="icon-cellphone-list">
            <i className={CELLPHONE_ICON[cellType] || 1} />
        </div>
    );
}
