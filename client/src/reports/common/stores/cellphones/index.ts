import { Https } from '../../../../common/util/https';
import CellphoneStore from './cellphone-store'; // esto se cambiará cuando cellphones este en master 
import Cellphone from './cellphone'; // esto se cambiará cuando cellphones este en master
import { computed, toJS, action } from 'mobx';

export class CellphoneAndGroupStore {
    cellphoneStore: CellphoneStore;

    constructor(https: Https) {
        this.cellphoneStore = new CellphoneStore(https);
    }
    @computed get getCellphonesFilterItems(): (Cellphone)[] {
        return ([] as (Cellphone)[])
            .concat(toJS(this.cellphoneStore.getCellphones));
    }

    @action fetchIfNeeded() {
        this.cellphoneStore.fetchCellphonesIfNeeded();
    }

    @computed get isLoading(): boolean {
        return this.cellphoneStore.isFetching;
    }
}