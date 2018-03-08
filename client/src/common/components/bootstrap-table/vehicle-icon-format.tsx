import * as React from 'react';

enum VEHICLE_ICON {
  'icon-truck' = 1,
  'icon-car',
  'icon-bus',
  'icon-moto',
  'icon-person',
  'icon-trailer',
  'icon-buidling',
  'icon-lift-truck',
  'icon-taxi',
  'icon-pick-up',
  'icon-tractor',
  'icon-excavator',
  'icon-patrol',
  'icon-phone2',
  'icon-airplane' = 16,
  'icon-helicopter' = 17,
  'icon-ship' = 18
}

export default function VehicleIconFormat (vehType: string) {
    return (
      <div className="icon-vehicle-list">
        <i className={VEHICLE_ICON[vehType] || 1}/>
      </div>
    );
}
