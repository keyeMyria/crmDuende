import * as React from 'react';
import { parse } from 'date-fns';
import { Submit } from '../../common/buttons/submit';
import { ReportFormat, REPORT_FORMAT } from '../../common/filters/report-format';
import { ParamsForm } from '../../common/components/params-form';
import { ActionsRow } from '../../common/components/actions-row';
import { ParamRow } from '../../common/components/param-row';
import { Print } from '../../common/buttons/print';
import { DatePresets } from '../../common/filters/date-presets';
import { ParamDateRow } from '../../common/components/param-date-row';
import { ReportParameters } from '../../common/types/report-parameters';
import { IndexStore } from '../stores/index';
import User from '../../../users/types/users';
import UsersFilter from '../../common/filters/user-filter';
import '../../common/resources/styles/params-form.css';

export interface UserReportFiltersProps {
    dateFormat: string; 
    disabledSubmit: boolean;
    userItems: User[];
    canPrint: boolean;
    isFetchingUsers: boolean;
    isFetchingReport: boolean;
    store: IndexStore;
    onSubmit(params: ReportParameters): void;
}

interface UserReportFiltersState {
    report: ReportParameters;
}

export class UserReportFilters extends React.Component<UserReportFiltersProps, UserReportFiltersState> {

    today = new Date();

    state: UserReportFiltersState = {
        report: {
            format: REPORT_FORMAT.WEBFULL,
            start_date: this.today.toISOString().split('T')[0],
            start_time: '00:00',
            end_date: this.today.toISOString().split('T')[0],
            end_time: '23:59',
            user_ids: [] as string[]

        }
    };

    getLimitUntil = () => {
        const endDate = parse(this.state.report.end_date as string);
        return this.today > endDate ? endDate : this.today;
    }

    handleChange = (change: any, valueName: string) => {
        const report = { ...this.state.report, [valueName]: change };
        this.setState({ report });
    }

    handleDatesChange = (startDate: string, endDate: string) => {
        const report = { ...this.state.report, ['start_date']: startDate, ['end_date']: endDate };
        this.setState({ report });
    }

    handleSubmit = () => {
        delete this.state.report['start_time' || '']; 
        delete this.state.report['end_time' || '']; 
        this.props.onSubmit(this.state.report);
    }

    render() {
        return (
            <ParamsForm>
                <ParamDateRow labelId="Rango de Días">
                    <DatePresets
                        startDate={this.state.report.start_date!}
                        endDate={this.state.report.end_date!}
                        onChange={this.handleDatesChange}

                    />
                </ParamDateRow>
                <ParamRow labelId="Usuarios">
                    <UsersFilter
                        valueName="user_id"
                        usersItems={this.props.userItems}
                        onChange={this.handleChange}
                        value={this.state.report.user_ids!}
                        isLoading={this.props.isFetchingUsers}
                    />
                </ParamRow>
                <ParamRow labelId="Formato">
                    <ReportFormat
                        valueName="format"
                        value={this.state.report.format}
                        availableTypes={[REPORT_FORMAT.WEBFULL]}
                        onClick={this.handleChange}
                    />
                </ParamRow>
                <ActionsRow>
                    {
                        (this.state.report.format === REPORT_FORMAT.WEBFULL)

                            ? <Submit
                                onSubmit={this.handleSubmit}
                                disabled={this.props.disabledSubmit}
                                isFetching={this.props.isFetchingReport}
                            />
                            : <div/>
                    }
                    {this.props.canPrint && <Print />}
                </ActionsRow>
            </ParamsForm>
        );
    }
}