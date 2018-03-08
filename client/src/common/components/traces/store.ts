import 'whatwg-fetch';
import Trace from '../../types/trace';
import { observable, action } from 'mobx';
import { Https } from '../../../common/util/https';

const API_URL = '/ajax/traces.php';

class TracesStore {
    @observable isFetching: boolean = false;
    @observable traces: Trace[] = [] as Trace[];
    private https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action async fetchTraces(objClass: string, objId: number | string) {
        this.isFetching = true;
        const response = await this.https.get(`${API_URL}?obj_class=${objClass}&obj_id=${objId}`);
        if (response.success) { this.traces = response.data; }
        this.isFetching = false;
        return response.success;
    }

    @action resetTraces() {
        this.traces = [];
    }
}

export default TracesStore;
