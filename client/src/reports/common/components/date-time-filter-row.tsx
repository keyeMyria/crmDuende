import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import HourRange, { HourRangeProps } from '../filters/hour-range';
import { DatePresets, DatePresetsProps } from '../filters/date-presets';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export interface DateTimeFilterPropsRow {
    hourRange: HourRangeProps;
    datePresets: DatePresetsProps;
    hideLabel?: boolean;
}

const tooltip = (
    <Tooltip id="available_tooltip">
        <FormattedMessage id="common.available_schedule_info" />
    </Tooltip>
);

export function DateTimeFilterRow(props: DateTimeFilterPropsRow) {

    return (
        <div className="row">
            <div className="text-right pr-label col-sm-2 col-xs-12">
                <FormattedMessage id="common.dates_range">
                    {(text: string) => (
                        <label>{text}:</label>
                    )}
                </FormattedMessage>
            </div>
            <div className="col-sm-10 col-md-10 col-lg-8 col-xs-12 filters">
                <DatePresets {...props.datePresets} />
                {props.hideLabel ? (
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                ) : (
                        <FormattedMessage id="common.available_schedule">
                            {(text: string) => (
                                <label
                                    style={{ marginRight: '1px' }}
                                >{text}:
                            <OverlayTrigger placement="top" overlay={tooltip} >
                                        <i className="icon-info" />
                                    </OverlayTrigger>
                                </label>
                            )}
                        </FormattedMessage>
                    )}
                <HourRange {...props.hourRange} />
            </div>
        </div>
    );
}
