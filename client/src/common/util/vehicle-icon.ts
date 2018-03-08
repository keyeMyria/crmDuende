enum VehicleType {
    Truck = 1,
    Car,
    Bus,
    Motorcycle,
    Person,
    SemiTrailer,
    Building,
    ForkLift,
    Taxi,
    PickUp,
    Tractor,
    Excavator,
    PatrolCar,
    MobilePhone,
    Trailer,
    Airplane,
    Helicopter,
    Ship
}

export const getVehicleIconClass = (type: number): string => {
    switch (type) {
            case VehicleType.Truck:
                return 'icon-truck';
            case VehicleType.Car:
                return 'icon-car';
            case VehicleType.Bus:
                return 'icon-bus';
            case VehicleType.Motorcycle:
                return 'icon-moto';
            case VehicleType.Person:
                return 'icon-user';
            case VehicleType.SemiTrailer:
                return 'icon-toll-truck';
            case VehicleType.Building:
                return 'icon-user';
            case VehicleType.ForkLift:
                return 'icon-lift-truck';
            case VehicleType.Taxi:
                return 'icon-taxi';
            case VehicleType.PickUp:
                return 'icon-pick-up';
            case VehicleType.Tractor:
                return 'icon-tractor';
            case VehicleType.Excavator:
                return 'icon-excavator';
            case VehicleType.PatrolCar:
                return 'icon-patrol';
            case VehicleType.MobilePhone:
                return 'icon-phone2';
            case VehicleType.Trailer:
                return 'icon-trailer';
            case VehicleType.Airplane:
                return 'icon-airplane';
            case VehicleType.Helicopter:
                return 'icon-helicopter';
            case VehicleType.Ship:
                return 'icon-ship';
            default:
                return 'icon-car';
        }
};