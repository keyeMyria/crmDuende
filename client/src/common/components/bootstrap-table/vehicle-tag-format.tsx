import * as React from 'react';
import { VehicleGroup, Vehicle } from '../../../vehicle-manager/types';

export default function VehicleTagFormat(
    groups: string[],
    vehicle: Vehicle,
    { vehicleGroups, placeholder }: { vehicleGroups: VehicleGroup[], placeholder: JSX.Element | string }) {

    const groupToLookUp = groups[0];
    let group: VehicleGroup = {} as VehicleGroup;

    vehicleGroups.forEach(vehicleGroup => {
        if (vehicleGroup.id === groupToLookUp) { group = vehicleGroup; }
    });

    if (group.id) {
        return (
            <span>
                <i className="icon-tag" style={{ color: group.color, marginRight: '6px', verticalAlign: 'middle' }}/>
                {group.name}
            </span>
        );
    } else {
        return placeholder;
    }
}
