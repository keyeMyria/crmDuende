import * as React from 'react';
import { ChartBox } from './chart-box';
import { RANGES } from '../util/comparator-ranges';
import { AutoSizer } from 'react-virtualized';
import { CheckinsByPhoneChart } from './checkins-by-phone-chart';
import { ByPhone } from '../../reports/checkin-report/types/checkin-report';
import Cellphone from '../../reports/common/stores/cellphones/cellphone';
import { FormattedMessage } from 'react-intl';

export interface CheckinsByPhoneBoxProps {
    range: RANGES;
    currentData: ByPhone;
    prevData: ByPhone;
    cellphones: Cellphone[];
}

interface CheckinsByPhoneBoxState {
    shouldCompare: boolean;
}

export default class CheckinsByPhoneBox extends React.Component<CheckinsByPhoneBoxProps, CheckinsByPhoneBoxState> {

    state: CheckinsByPhoneBoxState = {
        shouldCompare: true
    };

    handleCompareChange = (shouldCompare: boolean) => { this.setState({shouldCompare}); };

    render() {
        return (
            <ChartBox
                title={<FormattedMessage id={'checkins_by_cellphone'} />}
                range={this.props.range}
                shouldCompare={this.state.shouldCompare}
                onCompare={this.handleCompareChange}
            >
                <AutoSizer disableHeight={true}>
                    {({ width }: { width: number }) => (
                        <CheckinsByPhoneChart
                            width={width}
                            data={this.props.currentData}
                            previousData={this.props.prevData}
                            range={this.props.range}
                            shouldCompare={this.state.shouldCompare}
                            cellphones={this.props.cellphones}
                        />
                    )}
                </AutoSizer>
            </ChartBox>
        );
    }
}
