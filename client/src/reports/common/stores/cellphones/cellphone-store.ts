import { observable, action, computed } from 'mobx';
import { Https } from '../../../../common/util/https';
import Cellphone from './cellphone';


export default class CellphoneStore {
    @observable isFetching: boolean = false;
    @observable private cellphones: Cellphone[] = [] as Cellphone[];

    constructor(https: Https) {
    }

    @action fetchCellphonesIfNeeded() {
        if (this.cellphones.length === 0) { this.fetchCellphones(); }
    }

    @action async fetchCellphones() {
        this.isFetching = true;
        const response = {
            "success": true,
            "data": [
                {
                    "id": "222",
                    "description": "Albatross - Beak",
                    "model": "Civic",
                    "firmware": "Mar 22 2016 12:43:57",
                    "license_plate": "789grt",
                    "veh_type": "2",
                    "tags": [
                        "155"
                    ],
                    "picture": "/images/attribs/vehicle/picture_bbecab2041b3080a3e21045ed175e93f3f49f571_thumb.jpg",
                    "unit_id": "5477",
                    "make": "Honda",
                    "status": "0",
                    "insurance_expiration": "2018-05-08",
                    "distperfuel_est": "17.791991411236",
                    "fuel_type": "Super",
                    "long_description": "Albatross - Beak (789grt)"
                },
                {
                    "id": "218",
                    "description": "Albatross - Feather 2",
                    "model": "Corolla",
                    "firmware": "?Mar 22 2016 12:43:57",
                    "license_plate": "45sdf",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": "/images/attribs/vehicle/picture_ebade25865c1df2d727899cbed4302db56d076c4_thumb.png",
                    "unit_id": "5476",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": "Diesel",
                    "long_description": "Albatross - Feather 2 (45sdf)"
                },
                {
                    "id": "224",
                    "description": "Albatross - Gut",
                    "model": "protege",
                    "firmware": "Mar 22 2016 12:43:57",
                    "license_plate": "789hty",
                    "veh_type": "17",
                    "tags": [
                        "153"
                    ],
                    "picture": null,
                    "unit_id": "5478",
                    "make": "mazda",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0.760815668364677",
                    "fuel_type": null,
                    "long_description": "Albatross - Gut (789hty)"
                },
                {
                    "id": "205",
                    "description": "Alematics - AFUX",
                    "model": "NA",
                    "firmware": "0.0",
                    "license_plate": "140FJO",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1978",
                    "make": "Marca",
                    "status": "2",
                    "insurance_expiration": null,
                    "distperfuel_est": "1.8492047494975",
                    "fuel_type": null,
                    "long_description": "Alematics - AFUX (140FJO)"
                },
                {
                    "id": "170",
                    "description": "Alematics - XP-38",
                    "model": "Landspeeder",
                    "firmware": "1.15",
                    "license_plate": "214LSO",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": "/images/attribs/vehicle/picture_02a57f621d59ecddc2113ea6d8c4d3d9e4c9014b_thumb.png",
                    "unit_id": "1977",
                    "make": "SoroSuub Corp.",
                    "status": "4",
                    "insurance_expiration": "2016-04-07",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Alematics - XP-38 (214LSO)"
                },
                {
                    "id": "239",
                    "description": "ALP",
                    "model": "AL1",
                    "firmware": "0.0",
                    "license_plate": "C-14020",
                    "veh_type": "3",
                    "tags": [
                        "150"
                    ],
                    "picture": "/images/attribs/vehicle/picture_8ddc27f6044d709413be5edc23cbaea5d3558778_thumb.jpg",
                    "unit_id": "4",
                    "make": "Atrack",
                    "status": "3",
                    "insurance_expiration": "2017-11-20",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ALP (C-14020)"
                },
                {
                    "id": "252",
                    "description": "$ Android - Galaxy Nexus",
                    "model": "Galaxy Nexus",
                    "firmware": "android-3.11.1(dev)",
                    "license_plate": "C-12345678",
                    "veh_type": "14",
                    "tags": [
                        "146"
                    ],
                    "picture": "/images/attribs/vehicle/picture_28859756a28b671461f7ff47c901f83913478a1b_thumb.jpg",
                    "unit_id": "2004",
                    "make": "Samsung",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": "Regular",
                    "long_description": "$ Android - Galaxy Nexus"
                },
                {
                    "id": "237",
                    "description": "$ Android - Moto Z",
                    "model": "Z",
                    "firmware": "android-3.16.2(dev)",
                    "license_plate": "123CLC",
                    "veh_type": "14",
                    "tags": [
                        "146"
                    ],
                    "picture": null,
                    "unit_id": "3",
                    "make": "Motorola",
                    "status": "0",
                    "insurance_expiration": "2017-08-28",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "$ Android - Moto Z"
                },
                {
                    "id": "232",
                    "description": "$ Android - Pixel XL",
                    "model": "Pixel XL",
                    "firmware": "android-3.16.2",
                    "license_plate": "123Pixel",
                    "veh_type": "14",
                    "tags": [
                        "146"
                    ],
                    "picture": "/images/attribs/vehicle/picture_14c46bd2e704e7cb4527a2abd789a0a17f29c0b6_thumb.jpg",
                    "unit_id": "1997",
                    "make": "Google",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "$ Android - Pixel XL"
                },
                {
                    "id": "213",
                    "description": "Atrack - AK7S",
                    "model": "Insane",
                    "firmware": "1.08 build.170800",
                    "license_plate": "124jo",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": "/images/attribs/vehicle/picture_a7715ebeceb28cb246f9b7db82816935bedd7a32_thumb.jpg",
                    "unit_id": "1996",
                    "make": "Cell",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Atrack - AK7S (124jo)"
                },
                {
                    "id": "240",
                    "description": "Atrack AL1 - RNA",
                    "model": "AL1",
                    "firmware": "0.0",
                    "license_plate": "C-17796",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5",
                    "make": "Atrack",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Atrack AL1 - RNA (C-17796)"
                },
                {
                    "id": "235",
                    "description": "Atrack AT5 test",
                    "model": "Corolla",
                    "firmware": "6.02 build.171401",
                    "license_plate": "457rew",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "2001",
                    "make": "Toyota",
                    "status": "3",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Atrack AT5 test (457rew)"
                },
                {
                    "id": "214",
                    "description": "ATrack - Flageles",
                    "model": "Corolla",
                    "firmware": "1.11 build.171315",
                    "license_plate": "ghy765",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1995",
                    "make": "Toyota",
                    "status": "4",
                    "insurance_expiration": null,
                    "distperfuel_est": "20.61",
                    "fuel_type": null,
                    "long_description": "ATrack - Flageles (ghy765)"
                },
                {
                    "id": "199",
                    "description": "ATrack - Mitochondria",
                    "model": "DNA",
                    "firmware": "0.0",
                    "license_plate": "13jno",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5938",
                    "make": "Cell",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ATrack - Mitochondria (13jno)"
                },
                {
                    "id": "169",
                    "description": "ATrack - Nucleus",
                    "model": "estilo",
                    "firmware": "1.08 build.170800",
                    "license_plate": "124wer",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": "/images/attribs/vehicle/picture_3d4c89b7168b94530a4774ef514f93d24bd1747d_thumb.png",
                    "unit_id": "1992",
                    "make": "marc",
                    "status": "0",
                    "insurance_expiration": "2016-04-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ATrack - Nucleus (124wer)"
                },
                {
                    "id": "200",
                    "description": "ATrack - Plastid",
                    "model": "Organelle",
                    "firmware": "1.00 build.174700",
                    "license_plate": "123Plas",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1993",
                    "make": "Cell",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ATrack - Plastid (123Plas)"
                },
                {
                    "id": "250",
                    "description": "$ Atrack - Rodolfo Rodas",
                    "model": "Protege",
                    "firmware": "1.07",
                    "license_plate": "P-389DQR",
                    "veh_type": "2",
                    "tags": [
                        "114"
                    ],
                    "picture": "/images/attribs/vehicle/picture_04d978e79e851e4efe1a771ac82be129e3dae0a1_thumb.jpg",
                    "unit_id": "15474",
                    "make": "Mazda",
                    "status": "0",
                    "insurance_expiration": "2018-05-31",
                    "distperfuel_est": "3.96258160606603",
                    "fuel_type": null,
                    "long_description": "$ Atrack - Rodolfo Rodas (P-389DQR)"
                },
                {
                    "id": "211",
                    "description": "ATrack - SKYDATAPA",
                    "model": "1234",
                    "firmware": "1.11 build.171315",
                    "license_plate": "533535",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1994",
                    "make": "1234",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ATrack - SKYDATAPA (533535)"
                },
                {
                    "id": "201",
                    "description": "CALAMP TTU07",
                    "model": "Baron",
                    "firmware": "41d",
                    "license_plate": "389DQR",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "4470",
                    "make": "Human",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "CALAMP TTU07 (389DQR)"
                },
                {
                    "id": "178",
                    "description": "CareU - Nivea",
                    "model": "Ponds",
                    "firmware": "v1.0 r01",
                    "license_plate": "404ERR",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "2010",
                    "make": "Palmolive",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "CareU - Nivea (404ERR)"
                },
                {
                    "id": "221",
                    "description": "CareU - Olay",
                    "model": "Corolla",
                    "firmware": "v1.0r01",
                    "license_plate": "234fgt",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "2012",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "CareU - Olay (234fgt)"
                },
                {
                    "id": "303",
                    "description": "CareUP2",
                    "model": "P2",
                    "firmware": "v1.0r00",
                    "license_plate": "754gfr",
                    "veh_type": "5",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "2013",
                    "make": "Care",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "CareUP2"
                },
                {
                    "id": "185",
                    "description": "CareU - Ponds",
                    "model": "Skin",
                    "firmware": "UEGv1.0r00",
                    "license_plate": "8877RAWR",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "2011",
                    "make": "Complete",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "CareU - Ponds (8877RAWR)"
                },
                {
                    "id": "175",
                    "description": "Cellocator - Clint Barton",
                    "model": "NA",
                    "firmware": "0.0",
                    "license_plate": "133",
                    "veh_type": "18",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "666",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Cellocator - Clint Barton (133)"
                },
                {
                    "id": "172",
                    "description": "Cellocator - King TChalla",
                    "model": "Black",
                    "firmware": "33x",
                    "license_plate": "956qqr",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1821",
                    "make": "Panther",
                    "status": "0",
                    "insurance_expiration": "2016-05-10",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Cellocator - King TChalla (956qqr)"
                },
                {
                    "id": "177",
                    "description": "Cellocator - Pepper Potts",
                    "model": "Mark XXVIII",
                    "firmware": "43m",
                    "license_plate": "944ppt",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1823",
                    "make": "IMSUIT",
                    "status": "2",
                    "insurance_expiration": "2018-12-13",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Cellocator - Pepper Potts (944ppt)"
                },
                {
                    "id": "176",
                    "description": "Cellocator - Rogers Steve",
                    "model": "Ferrari",
                    "firmware": "0.0",
                    "license_plate": "1234",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "667",
                    "make": "Ferrari",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Cellocator - Rogers Steve (1234)"
                },
                {
                    "id": "173",
                    "description": "Cellocator - Winter Soldier",
                    "model": "Barnes",
                    "firmware": "31a",
                    "license_plate": "478GGR",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1822",
                    "make": "Buchanan",
                    "status": "0",
                    "insurance_expiration": "2016-05-10",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Cellocator - Winter Soldier (478GGR)"
                },
                {
                    "id": "310",
                    "description": "Creado",
                    "model": "Motola",
                    "firmware": "0.0",
                    "license_plate": "c6",
                    "veh_type": "14",
                    "tags": [
                        "113"
                    ],
                    "picture": null,
                    "unit_id": "15490",
                    "make": "Marca",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Creado"
                },
                {
                    "id": "183",
                    "description": "EddiePlus - Red Ranger",
                    "model": "Morphing",
                    "firmware": "TT8750PR02A03V07",
                    "license_plate": "421no",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "4000",
                    "make": "Mighty",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "EddiePlus - Red Ranger (421no)"
                },
                {
                    "id": "323",
                    "description": "Elvin Pruebas",
                    "model": "NA",
                    "firmware": "ios-2",
                    "license_plate": "14009",
                    "veh_type": "14",
                    "tags": [],
                    "picture": null,
                    "unit_id": "14009",
                    "make": "hgh",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Elvin Pruebas"
                },
                {
                    "id": "328",
                    "description": "elvin pruebas marzo",
                    "model": "NA",
                    "firmware": "ios-4",
                    "license_plate": "14014",
                    "veh_type": "14",
                    "tags": [],
                    "picture": null,
                    "unit_id": "14014",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "elvin pruebas marzo"
                },
                {
                    "id": "308",
                    "description": "Esto esta bien",
                    "model": "a",
                    "firmware": "0.0",
                    "license_plate": "a7",
                    "veh_type": "14",
                    "tags": [
                        "113"
                    ],
                    "picture": null,
                    "unit_id": "15488",
                    "make": "Amarillo",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Esto esta bien"
                },
                {
                    "id": "189",
                    "description": "ET20",
                    "model": "Pet",
                    "firmware": "V200.8601.1531",
                    "license_plate": "456jkl",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "3755",
                    "make": "Tracking",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ET20 (456jkl)"
                },
                {
                    "id": "191",
                    "description": "ETSafe - Bike",
                    "model": "Optimus",
                    "firmware": "0.0",
                    "license_plate": "132BAK",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "3756",
                    "make": "Liska",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ETSafe - Bike (132BAK)"
                },
                {
                    "id": "187",
                    "description": "ETSafe - Nat",
                    "model": "Smirley",
                    "firmware": "V07S.8601.1709",
                    "license_plate": "123SHI",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "3754",
                    "make": "Skirley",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ETSafe - Nat (123SHI)"
                },
                {
                    "id": "325",
                    "description": "ET-SAFE NAT2",
                    "model": "Corolla",
                    "firmware": "0.0",
                    "license_plate": "145ERD",
                    "veh_type": "1",
                    "tags": [],
                    "picture": null,
                    "unit_id": "14011",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "ET-SAFE NAT2 (145ERD)"
                },
                {
                    "id": "243",
                    "description": "Fifotrack",
                    "model": "Prueba",
                    "firmware": "1.01",
                    "license_plate": "S20",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1825",
                    "make": "Prueba",
                    "status": "3",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Fifotrack (S20)"
                },
                {
                    "id": "197",
                    "description": "Fifotrack - Diode",
                    "model": "Binary",
                    "firmware": "1.8",
                    "license_plate": "132NPN",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "10102",
                    "make": "Electric",
                    "status": "1",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Fifotrack - Diode (132NPN)"
                },
                {
                    "id": "206",
                    "description": "Fifotrack - Resistor",
                    "model": "IO",
                    "firmware": "1.02",
                    "license_plate": "110IOI",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "10103",
                    "make": "OIIO",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Fifotrack - Resistor (110IOI)"
                },
                {
                    "id": "196",
                    "description": "Fifotrack - Transistor",
                    "model": "Transistor",
                    "firmware": "1.1",
                    "license_plate": "01BIT",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "10101",
                    "make": "Electric",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Fifotrack - Transistor (01BIT)"
                },
                {
                    "id": "207",
                    "description": "GL300 - Honey",
                    "model": "Enzyme",
                    "firmware": "00",
                    "license_plate": "412nono",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "9880",
                    "make": "Osito",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "GL300 - Honey (412nono)"
                },
                {
                    "id": "238",
                    "description": "GL300 - Nicaragua",
                    "model": "Walther",
                    "firmware": "00",
                    "license_plate": "123NIC",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "9882",
                    "make": "Seguridad Móvil",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "GL300 - Nicaragua (123NIC)"
                },
                {
                    "id": "233",
                    "description": "GL300W",
                    "model": "Corolla",
                    "firmware": "0.0",
                    "license_plate": "789DRJ",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "9881",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "GL300W (789DRJ)"
                },
                {
                    "id": "174",
                    "description": "GV300 carro Aroldo",
                    "model": "Sephia",
                    "firmware": "01",
                    "license_plate": "P-634DBF",
                    "veh_type": "2",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1820",
                    "make": "Kia",
                    "status": "0",
                    "insurance_expiration": "2016-05-12",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "GV300 carro Aroldo (P-634DBF)"
                },
                {
                    "id": "241",
                    "description": "GV300N test",
                    "model": "Corolla",
                    "firmware": "05",
                    "license_plate": "563web",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1824",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "GV300N test (563web)"
                },
                {
                    "id": "193",
                    "description": "GV75 - Pyramid",
                    "model": "Egos",
                    "firmware": "06",
                    "license_plate": "759GGF",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "7500",
                    "make": "Slav",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "GV75 - Pyramid (759GGF)"
                },
                {
                    "id": "294",
                    "description": "iPhone 6 Diego",
                    "model": "NA",
                    "firmware": "ios-10",
                    "license_plate": "15481",
                    "veh_type": "14",
                    "tags": [
                        "129"
                    ],
                    "picture": null,
                    "unit_id": "15481",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "iPhone 6 Diego"
                },
                {
                    "id": "329",
                    "description": "IPHONEDEDIEGO",
                    "model": "NA",
                    "firmware": "ios-3",
                    "license_plate": "14015",
                    "veh_type": "14",
                    "tags": [],
                    "picture": null,
                    "unit_id": "14015",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "IPHONEDEDIEGO"
                },
                {
                    "id": "316",
                    "description": "iPhone Demo",
                    "model": "NA",
                    "firmware": "ios-2",
                    "license_plate": "14006",
                    "veh_type": "14",
                    "tags": [
                        "122"
                    ],
                    "picture": null,
                    "unit_id": "14006",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "iPhone Demo"
                },
                {
                    "id": "315",
                    "description": "iPhone Diego Demo",
                    "model": "NA",
                    "firmware": "ios-3",
                    "license_plate": "14005",
                    "veh_type": "14",
                    "tags": [
                        "122"
                    ],
                    "picture": null,
                    "unit_id": "14005",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "iPhone Diego Demo"
                },
                {
                    "id": "311",
                    "description": "iPhone Elvin",
                    "model": "NA",
                    "firmware": "ios-3",
                    "license_plate": "15491",
                    "veh_type": "14",
                    "tags": [
                        "122"
                    ],
                    "picture": null,
                    "unit_id": "15491",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "iPhone Elvin"
                },
                {
                    "id": "295",
                    "description": "iPhone Mercedees",
                    "model": "Iphone 5",
                    "firmware": "ios-6",
                    "license_plate": "15482",
                    "veh_type": "14",
                    "tags": [
                        "122"
                    ],
                    "picture": null,
                    "unit_id": "15482",
                    "make": "Apple",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "iPhone Mercedees"
                },
                {
                    "id": "293",
                    "description": "iPhoneSimulador",
                    "model": "Rover",
                    "firmware": "ios-13",
                    "license_plate": "15480",
                    "veh_type": "14",
                    "tags": [
                        "122"
                    ],
                    "picture": null,
                    "unit_id": "15480",
                    "make": "NASA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "56.78",
                    "fuel_type": null,
                    "long_description": "iPhoneSimulador"
                },
                {
                    "id": "195",
                    "description": "Jimi - Fallon",
                    "model": "Tonight",
                    "firmware": "3.3",
                    "license_plate": "134HIGG",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1313",
                    "make": "NBC",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Jimi - Fallon (134HIGG)"
                },
                {
                    "id": "168",
                    "description": "Jimi - Turbocarro",
                    "model": "estilo",
                    "firmware": "3.3",
                    "license_plate": "456qwe",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": "/images/attribs/vehicle/picture_128c077fc960edd9588c49ec7f2845f2e8eb1569_thumb.png",
                    "unit_id": "1975",
                    "make": "marc",
                    "status": "0",
                    "insurance_expiration": "2016-04-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Jimi - Turbocarro (456qwe)"
                },
                {
                    "id": "305",
                    "description": "Josue",
                    "model": "NA",
                    "firmware": "0.0",
                    "license_plate": "e6",
                    "veh_type": "14",
                    "tags": [
                        "113"
                    ],
                    "picture": null,
                    "unit_id": "15485",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Josue"
                },
                {
                    "id": "231",
                    "description": "Leencon-LX02",
                    "model": "Corolla",
                    "firmware": "0.0",
                    "license_plate": "786fs",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "14002",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Leencon-LX02 (786fs)"
                },
                {
                    "id": "307",
                    "description": "Manager",
                    "model": "Na",
                    "firmware": "0.0",
                    "license_plate": "a3",
                    "veh_type": "14",
                    "tags": [
                        "113"
                    ],
                    "picture": null,
                    "unit_id": "15487",
                    "make": "Na",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Manager"
                },
                {
                    "id": "251",
                    "description": "Meitrack MT90 test",
                    "model": "Corolla",
                    "firmware": "0.0",
                    "license_plate": "145erd",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "2345",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Meitrack MT90 test (145erd)"
                },
                {
                    "id": "253",
                    "description": "Meitrack P99G",
                    "model": "Civic",
                    "firmware": "0.0",
                    "license_plate": "567ytr",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "2346",
                    "make": "Honda",
                    "status": "0",
                    "insurance_expiration": "1970-01-01",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Meitrack P99G (567ytr)"
                },
                {
                    "id": "242",
                    "description": "Mitsubishi Lancer",
                    "model": "LANCER",
                    "firmware": "0.0",
                    "license_plate": "336dmz",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5134",
                    "make": "Mitsubishi",
                    "status": "0",
                    "insurance_expiration": "2018-03-29",
                    "distperfuel_est": "35",
                    "fuel_type": null,
                    "long_description": "Mitsubishi Lancer (336dmz)"
                },
                {
                    "id": "249",
                    "description": "Oigo - Aroldo",
                    "model": "ARoldo",
                    "firmware": "0.0",
                    "license_plate": "164ARO",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5170",
                    "make": "ArOLdo",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0.53",
                    "fuel_type": null,
                    "long_description": "Oigo - Aroldo (164ARO)"
                },
                {
                    "id": "134",
                    "description": "Oigo - DWWX-77",
                    "model": "A2",
                    "firmware": "2.0.40",
                    "license_plate": "DWWX-77",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5168",
                    "make": "A1",
                    "status": "0",
                    "insurance_expiration": "2015-12-09",
                    "distperfuel_est": "51",
                    "fuel_type": null,
                    "long_description": "Oigo - DWWX-77 (DWWX-77)"
                },
                {
                    "id": "247",
                    "description": "Oigo - Tester",
                    "model": "Linea",
                    "firmware": "0.0",
                    "license_plate": "123OIGO",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5169",
                    "make": "Marca",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Oigo - Tester (123OIGO)"
                },
                {
                    "id": "226",
                    "description": "P-336DMZ",
                    "model": "TBS",
                    "firmware": "0.0",
                    "license_plate": "P-336DMZ",
                    "veh_type": "4",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5000",
                    "make": "HONDA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "P-336DMZ (P-336DMZ)"
                },
                {
                    "id": "244",
                    "description": "Piccolo - Bumblebee",
                    "model": "Portatil",
                    "firmware": "0.0",
                    "license_plate": "948PIC",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "340",
                    "make": "Piccolo",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Piccolo - Bumblebee (948PIC)"
                },
                {
                    "id": "306",
                    "description": "prueba",
                    "model": "r",
                    "firmware": "0.0",
                    "license_plate": "a2",
                    "veh_type": "14",
                    "tags": [
                        "113"
                    ],
                    "picture": null,
                    "unit_id": "15486",
                    "make": "r",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "prueba"
                },
                {
                    "id": "227",
                    "description": "Prueba",
                    "model": "prueba",
                    "firmware": "0.0",
                    "license_plate": "prueba",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5748",
                    "make": "Honda",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Prueba (prueba)"
                },
                {
                    "id": "304",
                    "description": "Prueba",
                    "model": "J7 Prime",
                    "firmware": "0.0",
                    "license_plate": "e3",
                    "veh_type": "14",
                    "tags": [
                        "110"
                    ],
                    "picture": null,
                    "unit_id": "15484",
                    "make": "Android",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Prueba"
                },
                {
                    "id": "180",
                    "description": "Ruptela - Katana",
                    "model": "Sword",
                    "firmware": "00.02.03.17",
                    "license_plate": "993OPI",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1817",
                    "make": "Rupee",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Ruptela - Katana (993OPI)"
                },
                {
                    "id": "179",
                    "description": "Ruptela - Onii",
                    "model": "Estilo o Linea",
                    "firmware": "00.02.09.04",
                    "license_plate": "144JAP",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1818",
                    "make": "El KittyMovil",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Ruptela - Onii (144JAP)"
                },
                {
                    "id": "182",
                    "description": "Ruptela - Origami",
                    "model": "No puedo contigo",
                    "firmware": "00.01.13.03",
                    "license_plate": "599DRJ",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1815",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Ruptela - Origami (599DRJ)"
                },
                {
                    "id": "171",
                    "description": "Ruptela - Samurai",
                    "model": "PRO4",
                    "firmware": "00.02.05.07",
                    "license_plate": "555RUP",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1819",
                    "make": "Marca",
                    "status": "0",
                    "insurance_expiration": "2016-04-14",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Ruptela - Samurai (555RUP)"
                },
                {
                    "id": "181",
                    "description": "Ruptela - Shuriiken",
                    "model": "El mismo mio",
                    "firmware": "00.01.13.03",
                    "license_plate": "422JPA",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1816",
                    "make": "Toyota Corola",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Ruptela - Shuriiken (422JPA)"
                },
                {
                    "id": "215",
                    "description": "Samsung - S6",
                    "model": "S6",
                    "firmware": "0.0",
                    "license_plate": "1998",
                    "veh_type": "14",
                    "tags": [],
                    "picture": null,
                    "unit_id": "1998",
                    "make": "Samsung",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Samsung - S6"
                },
                {
                    "id": "327",
                    "description": "simulador 6s",
                    "model": "NA",
                    "firmware": "ios-3",
                    "license_plate": "14013",
                    "veh_type": "14",
                    "tags": [],
                    "picture": null,
                    "unit_id": "14013",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "simulador 6s"
                },
                {
                    "id": "312",
                    "description": "Simulador iPhone 6s",
                    "model": "NA",
                    "firmware": "ios-6",
                    "license_plate": "14003",
                    "veh_type": "14",
                    "tags": [
                        "122"
                    ],
                    "picture": null,
                    "unit_id": "14003",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Simulador iPhone 6s"
                },
                {
                    "id": "324",
                    "description": "simulador iphone 6s",
                    "model": "NA",
                    "firmware": "ios-2",
                    "license_plate": "14010",
                    "veh_type": "14",
                    "tags": [],
                    "picture": null,
                    "unit_id": "14010",
                    "make": "NA",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "simulador iphone 6s"
                },
                {
                    "id": "190",
                    "description": "Skypatrol - Blue Ranger",
                    "model": "Time Force",
                    "firmware": "TT8750PR02A03V07\r",
                    "license_plate": "142TFR",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "4001",
                    "make": "Saban",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Skypatrol - Blue Ranger (142TFR)"
                },
                {
                    "id": "217",
                    "description": "Skypatrol - Gold Ranger",
                    "model": "Morphing",
                    "firmware": "13",
                    "license_plate": "143GO",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5475",
                    "make": "Mighty",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Skypatrol - Gold Ranger (143GO)"
                },
                {
                    "id": "202",
                    "description": "Skypatrol - Green Ranger",
                    "model": "Morphing",
                    "firmware": "2.26",
                    "license_plate": "133MOR",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5470",
                    "make": "Mighty",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Skypatrol - Green Ranger (133MOR)"
                },
                {
                    "id": "204",
                    "description": "Skypatrol -Pink Ranger",
                    "model": "yaris",
                    "firmware": "0.0",
                    "license_plate": "789hjy",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5472",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Skypatrol -Pink Ranger (789hjy)"
                },
                {
                    "id": "203",
                    "description": "Skypatrol - Red Ranger",
                    "model": "Morphing",
                    "firmware": "0.0",
                    "license_plate": "142ZOR",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5471",
                    "make": "Mighty",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Skypatrol - Red Ranger (142ZOR)"
                },
                {
                    "id": "248",
                    "description": "Skypatrol SP5603NS",
                    "model": "Corolla",
                    "firmware": "0.0",
                    "license_plate": "234rgh",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5479",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Skypatrol SP5603NS (234rgh)"
                },
                {
                    "id": "230",
                    "description": "SKYPATROL TT",
                    "model": "Civic",
                    "firmware": "0801",
                    "license_plate": "785wer",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "14001",
                    "make": "Honda",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "SKYPATROL TT (785wer)"
                },
                {
                    "id": "210",
                    "description": "Skypatrol - White Ranger",
                    "model": "Morphing",
                    "firmware": "0.0",
                    "license_plate": "1580FIU",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5474",
                    "make": "Mighty",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Skypatrol - White Ranger (1580FIU)"
                },
                {
                    "id": "186",
                    "description": "Spectrotec - Meg",
                    "model": "Dameron",
                    "firmware": "0.0",
                    "license_plate": "765qew",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5934",
                    "make": "Poe",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Spectrotec - Meg (765qew)"
                },
                {
                    "id": "194",
                    "description": "Spetrotec - Amy",
                    "model": "Poe",
                    "firmware": "0.0",
                    "license_plate": "24no",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5936",
                    "make": "Dameron",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Spetrotec - Amy (24no)"
                },
                {
                    "id": "198",
                    "description": "Spetrotec - Beth",
                    "model": "Civic",
                    "firmware": "0.0",
                    "license_plate": "564FRD",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5937",
                    "make": "Honda",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Spetrotec - Beth (564FRD)"
                },
                {
                    "id": "188",
                    "description": "Spetrotec - Joelle",
                    "model": "Poe",
                    "firmware": "0.0",
                    "license_plate": "143LINK",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "5935",
                    "make": "Poe",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Spetrotec - Joelle (143LINK)"
                },
                {
                    "id": "167",
                    "description": "Suntech - Helium",
                    "model": "Atom",
                    "firmware": "725",
                    "license_plate": "566HE",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "3680",
                    "make": "Noble",
                    "status": "0",
                    "insurance_expiration": "2016-01-28",
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Suntech - Helium (566HE)"
                },
                {
                    "id": "220",
                    "description": "Suntech - Neon",
                    "model": "Civic",
                    "firmware": "870",
                    "license_plate": "hyt589",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "3683",
                    "make": "Honda",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Suntech - Neon (hyt589)"
                },
                {
                    "id": "208",
                    "description": "Suntech - Nitrogen",
                    "model": "Honda",
                    "firmware": "727",
                    "license_plate": "sdf234",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "3681",
                    "make": "Accord",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Suntech - Nitrogen (sdf234)"
                },
                {
                    "id": "209",
                    "description": "Suntech - Oxygen",
                    "model": "Hilux",
                    "firmware": "723",
                    "license_plate": "wer478",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "3682",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Suntech - Oxygen (wer478)"
                },
                {
                    "id": "223",
                    "description": "Suntech - Silicone",
                    "model": "Corolla",
                    "firmware": "907",
                    "license_plate": "789dre",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "3684",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Suntech - Silicone (789dre)"
                },
                {
                    "id": "184",
                    "description": "Syrus - Charmander",
                    "model": "Fire",
                    "firmware": "2.3.44",
                    "license_plate": "421nu",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "8214",
                    "make": "Starter",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Syrus - Charmander (421nu)"
                },
                {
                    "id": "236",
                    "description": "Test Alematics",
                    "model": "AM1",
                    "firmware": "0.0",
                    "license_plate": "C-15876",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "2",
                    "make": "Alematics",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "Test Alematics (C-15876)"
                },
                {
                    "id": "212",
                    "description": "tk102",
                    "model": "protege",
                    "firmware": "0.0",
                    "license_plate": "jki456",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1201",
                    "make": "mazda",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "tk102 (jki456)"
                },
                {
                    "id": "192",
                    "description": "TK103",
                    "model": "Civic",
                    "firmware": "0.0",
                    "license_plate": "456fds",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": null,
                    "unit_id": "1200",
                    "make": "Honda",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "TK103 (456fds)"
                },
                {
                    "id": "225",
                    "description": "TK103-Inalambrico",
                    "model": "Corolla",
                    "firmware": "0.0",
                    "license_plate": "752ert",
                    "veh_type": "1",
                    "tags": [
                        "1"
                    ],
                    "picture": "/images/attribs/vehicle/picture_dfc245977d084dfe1b8e9293d8287cbc21eb25c0_thumb.jpg",
                    "unit_id": "1202",
                    "make": "Toyota",
                    "status": "0",
                    "insurance_expiration": null,
                    "distperfuel_est": "0",
                    "fuel_type": null,
                    "long_description": "TK103-Inalambrico (752ert)"
                }
            ],
            "permissions": {
                "create": false,
                "update": true,
                "setTag": true
            }
        };
        if (response.success) {
            this.cellphones = this.filterCellphones(response.data) || [];
        }
        this.isFetching = false;
        return response.success;
    }

    @computed get getCellphones() { return this.cellphones; }

    private filterCellphones = (vehicles: any[]): Cellphone[] => vehicles.filter(
        vehicle => vehicle.veh_type === '14'
    )
    // TODO: Use cellphones api
}