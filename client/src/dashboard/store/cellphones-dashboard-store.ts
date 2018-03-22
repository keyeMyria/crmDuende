import { observable, action, computed } from 'mobx';
import { CellphonesDashboardData } from '../types/cellphones-dashboard-data';
import { CellphonesDashboadParams } from '../types/cellphones-dashboard-params';
import { Totals, ByPhone, ByDate } from '../types/checkin-report';


const LIVE_UPDATE_INTERVAL = 30000;

export class CellphonesDashboardStore {
    @observable params: CellphonesDashboadParams = {
        cellphones: [],
        date: new Date().toISOString().split('T')[0],
        days: 7
    };
    @observable data: CellphonesDashboardData = {} as CellphonesDashboardData;
    @observable isFetching: boolean;


    liveData = async () => {
        this.isFetching = true;
        await this.fetchData(this.params);
        this.isFetching = false;
        setInterval(
            () => {
                this.fetchData(this.params);
            },
            LIVE_UPDATE_INTERVAL
        );
    }

    @action fetchData = async (params: CellphonesDashboadParams) => {
        if (params.cellphones && params.cellphones.length === 0) {
            delete params.cellphones;
        }
        const response = {
            "success": true,
            "data": {
                "current": {
                    "new_pois": 0,
                    "rules_broken": 543,
                    "by_date": {
                        "2018-03-15": {
                            "effective": 2
                        },
                        "2018-03-16": {
                            "effective": 7
                        },
                        "2018-03-19": {
                            "effective": 20
                        },
                        "2018-03-20": {
                            "effective": 12
                        },
                        "2018-03-21": {
                            "effective": 5,
                            "not-effective": 1
                        },
                        "2018-03-22": {
                            "effective": 4,
                            "not-effective": 2
                        }
                    },
                    "by_cellphone": {
                        "232": {
                            "effective": 6,
                            "not-effective": 3
                        },
                        "237": {
                            "effective": 4
                        },
                        "315": {
                            "effective": 3
                        },
                        "327": {
                            "effective": 7
                        },
                        "329": {
                            "effective": 30
                        }
                    }
                },
                "previous": {
                    "new_pois": 578,
                    "rules_broken": 65,
                    "by_date": {
                        "2018-03-08": {
                            "effective": 1
                        },
                        "2018-03-12": {
                            "effective": 1
                        },
                        "2018-03-13": {
                            "effective": 17
                        }
                    },
                    "by_cellphone": {
                        "237": {
                            "effective": 4
                        },
                        "315": {
                            "effective": 14
                        },
                        "327": {
                            "effective": 1
                        }
                    }
                }
            }
        };
        if (response.success) {
            this.data = response.data;
        }
        return !!response.data;
    }

    @computed get createdPois(): [number, number] {
        let current = 0, prev = 0;
        if (this.data.previous && this.data.previous.new_pois) {
            prev = this.data.previous.new_pois;
        }
        if (this.data.current && this.data.current.new_pois) {
            current = this.data.current.new_pois;
        }
        return [current, prev];
    }

    @computed get rulesBroken(): [number, number] {
        let current = 0, prev = 0;
        if (this.data.previous && this.data.previous.rules_broken) {
            prev = this.data.previous.rules_broken;
        }
        if (this.data.current && this.data.current.rules_broken) {
            current = this.data.current.rules_broken;
        }
        return [current, prev];
    }

    @computed get madeCheckins(): [Totals, Totals] {
        return [this.currentTotalCheckins, this.prevTotalCheckins];
    }

    @computed get currentTotalCheckins(): Totals {
        let totals: Totals = {
            effective: 0,
            'not-effective': 0
        };
        if (this.data.current && this.data.current.by_date) {
            totals = this.sumCheckins(this.data.current.by_date);
        }
        return totals;
    }

    @computed get prevTotalCheckins(): Totals {
        let totals: Totals = {
            effective: 0,
            'not-effective': 0
        };
        if (this.data.previous && this.data.previous.by_date) {
            totals = this.sumCheckins(this.data.previous.by_date);
        }
        return totals;
    }

    sumCheckins = (data: ByPhone | ByDate) => {
        const keys = Object.keys(data);
        let effective = 0, notEffective = 0;
        keys.forEach(key => {
            effective += data[key].effective || 0;
            notEffective += data[key]['not-effective'] || 0;
        });
        return { effective, 'not-effective': notEffective };
    }

}