import * as React from 'react';
import * as Card from '../../common/components/card/index';
import '../styles/comparator-box.css';
import { ComparatorLegend } from './comparator-legend';
import { RANGES } from '../util/comparator-ranges';

export interface ComparatorBoxProps {
    title: string | JSX.Element;
    currentValue: number;
    previousValue: number;
    range: RANGES;
    reverseColors?: boolean;
}

export class ComparatorBox extends React.PureComponent<ComparatorBoxProps> {

    shouldComponentUpdate(nextProps: ComparatorBoxProps) {
        return nextProps.currentValue !== this.props.currentValue
            || nextProps.previousValue !== this.props.previousValue
            || nextProps.range !== this.props.range;
    }
    
    render() {
        return (
            <Card.Container class="cb-container">
                <Card.Title title={this.props.title} />
                <div className="row cb-value">
                    {this.props.currentValue}
                </div>
                <ComparatorLegend
                    currentValue={this.props.currentValue}
                    previousValue={this.props.previousValue}
                    range={this.props.range}
                    reverseColors={this.props.reverseColors}
                />
            </Card.Container>
        );
    }
}