import 'whatwg-fetch';
import { observable, action } from 'mobx';
import { ReportParameters } from '../../common/types/report-parameters';
import { encodeObject } from '../../../common/util/encode-object';
import { Https } from '../../../common/util/https';

const API_URL = 'pendiente';

export default class CommissionReportStore {
    @observable isFetching: boolean = false;
    @observable isDownloading: boolean = false;
    @observable data: any = {} as any;
    @observable reportParams: ReportParameters = {} as ReportParameters;
    private https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action async fetchDriverReport(parameters: ReportParameters) {
        this.isFetching = true;
        this.reportParams = parameters;
        const response: any = await this.https.get(`${API_URL}?${encodeObject(parameters)}&retdat=1`);
        if (response.timezone) {
            this.data = response || {};
        }
        this.isFetching = false;
        return Boolean(response.timezone);
    }
}