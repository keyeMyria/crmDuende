import * as React from 'react';
import { CellphoneGroup, Cellphone } from '../../../cellphones-manager/types';

export default function CellphoneTagFormat(
    groups: string[],
    cellphone: Cellphone,
    { cellphoneGroups, placeholder }: { cellphoneGroups: CellphoneGroup[], placeholder: JSX.Element | string }) {

    if (!!groups && !!cellphoneGroups) {
        const groupToLookUp = groups[0];
        let group: CellphoneGroup = {} as CellphoneGroup;

        cellphoneGroups.forEach(cellphoneGroup => {
            if (cellphoneGroup.id === groupToLookUp) { group = cellphoneGroup; }
        });

        if (group.id) {
            return (
                <label className="group-tag">
                    <i className="icon-tag " style={{ color: group.color, marginRight: '6px' }} />
                    {group.name}
                </label>
            );
        } else {
            return placeholder;
        }
    } else { return placeholder; }

}
