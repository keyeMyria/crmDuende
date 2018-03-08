import PoiGroup from '../types/poi-group';
import { observable, action } from 'mobx';
import { Https } from '../../common/util/https'; 

const API_URL = '/ajax/namedPlaceGroups.php';

export default class PoiGroupStore {
    @observable poiGroups: PoiGroup[] = [] as PoiGroup[];
    @observable isFetching: boolean = false;
    private https: Https;

    constructor(https: Https) { this.https = https; }

    @action fetchPoiGroupsIfNeeded = () => {
        if (this.poiGroups.length === 0) { this.fetchPoiGroups(); }
    }
    
    @action fetchPoiGroups = async () => {
        this.isFetching = true;
        const res = await this.https.get(`${API_URL}?cmd=list`);
        if (res.success) { this.poiGroups = res.data; }
        this.isFetching = false;
    }
}
