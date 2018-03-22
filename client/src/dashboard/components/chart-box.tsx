import * as React from 'react';
import * as Card from '../../common/components/card';
import { RANGES } from '../util/comparator-ranges';
import { ComparatorRange, RANGE_TYPE } from './comparator-range';
import '../styles/chart-box.css';
import Toggle from '../../common/components/toggle';
import '../../common/components/toggle/vehicles.css';
import { FormattedMessage } from 'react-intl';

export interface ChartBoxProps {
    title: string | JSX.Element;
    range: RANGES;
    children?: JSX.Element;
    shouldCompare: boolean;
    onCompare(shouldCOmpare: boolean): void;
}

export function ChartBox(props: ChartBoxProps) {
    return (
        <Card.Container style={{minHeight: '371px'}}>
            <div className="cb-header">
                <div className="chart-header-container">
                    <Card.Title title={props.title} />
                    <div>
                        <span className="label-text">
                            <FormattedMessage id="compare_with" />&nbsp;
                                <ComparatorRange
                                    type={RANGE_TYPE.PREVIOUS}
                                    range={props.range}
                                />:&nbsp;
                        </span>
                        <Toggle checked={props.shouldCompare} onClick={props.onCompare} />
                    </div>
                </div>
            </div>
            <div className="row cb-chart">
                {props.children}
            </div>
        </Card.Container>
    );
}
