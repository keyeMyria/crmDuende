import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CircleCheckin } from '../../reports/checkin-report/components/circle-checkin';
import { DifferencePercent } from './difference-percent';

type Payload = {
    payload: {
        tooltipTitle?: string;
        tooltipSubtitle?: string;
        name: string;
        successful: number;
        unsuccessful: number;
        total: number;
        forceEmptyMessage?: boolean;
        shouldCompare?: boolean;
        prevSuccess: string;
        prevUnsuccess: string;
        prevTitle: string | JSX.Element;
        prevTotal: number;
        currentTitle: string | JSX.Element;
        hideTitle?: boolean;
    };
};

export interface CheckinsTooltipProps {
    payload?: Payload[];
}

export function CheckinsTooltip(props: CheckinsTooltipProps) {

    const renderEmptyMessage = () => (
        <FormattedMessage id="empty_checkins_register">
            {(text: string) => (
                <div className="tooltip-item">{text}</div>
            )}
        </FormattedMessage>
    );

    const renderPrevData = (tooltipData: Payload) => (
        <div className="tooltip-content-box">
            <div className="tooltip-subtitle">
                {tooltipData.payload.prevTitle}
            </div>
            {
                tooltipData.payload.prevTotal === 0 ? (
                    <div className="tooltip-left-side">
                        {renderEmptyMessage()}
                    </div>
                ) : (
                        <div>
                            {tooltipData && (
                                <FormattedMessage id="checkin_type.successful">
                                    {(text: string) => (
                                        <div className="tooltip-item">
                                            <CircleCheckin isPrevious={true} successful={true} />&nbsp;
                            {text}: {tooltipData.payload.prevSuccess}
                                        </div>
                                    )}
                                </FormattedMessage>
                            )}
                            {tooltipData && (
                                <FormattedMessage id="checkin_type.unsuccessful">
                                    {(text: string) => (
                                        <div className="tooltip-item">
                                            <CircleCheckin
                                                successful={false}
                                                isPrevious={true}
                                            /> {text}: {tooltipData.payload.prevUnsuccess}
                                        </div>
                                    )}
                                </FormattedMessage>
                            )}
                            {tooltipData && (
                                <FormattedMessage id="common.total">
                                    {(text: string) => (
                                        <div className="tooltip-item">
                                            {text}: {tooltipData.payload.prevTotal}
                                        </div>
                                    )}
                                </FormattedMessage>
                            )}
                        </div>
                    )
            }
        </div>
    );

    const renderCurrentData = (tooltipData: Payload) => (
        <div className="tooltip-content-box">
            <div className="tooltip-subtitle">
                {tooltipData.payload.currentTitle}
            </div>
            {
                tooltipData.payload.total === 0 ? renderEmptyMessage()
                    : <div>
                        {tooltipData && (
                            <FormattedMessage id="checkin_type.successful">
                                {(text: string) => (
                                    <div className="tooltip-item">
                                        <CircleCheckin successful={true} /> {text}: {tooltipData.payload.successful}
                                    </div>
                                )}
                            </FormattedMessage>
                        )}
                        {tooltipData && (
                            <FormattedMessage id="checkin_type.unsuccessful">
                                {(text: string) => (
                                    <div className="tooltip-item">
                                        <CircleCheckin
                                            successful={false}
                                        /> {text}: {tooltipData.payload.unsuccessful}
                                    </div>
                                )}
                            </FormattedMessage>
                        )}
                        {tooltipData && (
                            <FormattedMessage id="common.total">
                                {(text: string) => (
                                    <div className="tooltip-item">
                                        {text}: {tooltipData.payload.total}
                                    </div>
                                )}
                            </FormattedMessage>
                        )}
                    </div>
            }
        </div>
    );

    const renderTooltip = (tooltipData: Payload) => (
        <div className="tooltip-container">
            {tooltipData && !tooltipData.payload.hideTitle && (
                <div className="tooltip-title">
                    {tooltipData.payload.tooltipTitle || tooltipData.payload.name}
                </div>
            )}
            {tooltipData.payload.tooltipSubtitle && (
                <div className="tooltip-subtitle">
                    {tooltipData.payload.tooltipSubtitle}
                </div>
            )}
            {tooltipData.payload.shouldCompare && (
                renderPrevData(tooltipData)
            )}
            {(tooltipData.payload.forceEmptyMessage) ? renderEmptyMessage() : (
                renderCurrentData(tooltipData)
            )}
            <div className="row tooltip-percent">
                <DifferencePercent
                    currentValue={tooltipData.payload.total}
                    previousValue={tooltipData.payload.prevTotal}
                />
            </div>
        </div>
    );

    const renderContent = (payload: Payload[]) => {
        const [tooltipData] = payload;
        return tooltipData ? renderTooltip(tooltipData) : renderEmptyMessage();
    };

    return (props.payload ? renderContent(props.payload) : <div />);
}
