import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { ByDate } from '../../reports/checkin-report/types/checkin-report';
import { ChartBox } from './chart-box';
import { RANGES } from '../util/comparator-ranges';
import { CheckinsByDateChart } from './checkins-by-date-chart';
import { FormattedMessage } from 'react-intl';

export interface CheckinByDataBoxProps {
    currentData: ByDate;
    previousData: ByDate;
    range: RANGES;
}
interface CheckinsByDateBoxState {
    shouldCompare: boolean;
}
export default class CheckinByDateBox extends React.Component<CheckinByDataBoxProps, CheckinsByDateBoxState> {
    state: CheckinsByDateBoxState = {
        shouldCompare: true
    };
    handleCompareChange = (shouldCompare: boolean) => { this.setState({ shouldCompare }); };
    render() {
        return (
            <ChartBox
                title={<FormattedMessage id={'checkins_by_date'} />}
                range={this.props.range}
                shouldCompare={this.state.shouldCompare}
                onCompare={this.handleCompareChange}
            >
                <AutoSizer disableHeight={true}>
                    {({ width }: { width: number }) => (
                        <CheckinsByDateChart
                            width={width}
                            data={this.props.currentData}
                            previousData={this.props.previousData}
                            range={this.props.range}
                            shouldCompare={this.state.shouldCompare}
                        />
                    )}
                </AutoSizer>
            </ChartBox>
        );

    }
}