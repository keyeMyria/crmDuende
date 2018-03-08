import * as React from 'react';
import { FormattedPlural, FormattedMessage } from 'react-intl';
import './title.css';

export interface TitleProps {
    title_one: string;
    title_many: string;
    count: number;
}

export default function Title (props: TitleProps) {

    const renderCounter = () => (
        <div className="side-selector-title-count">
            {props.count}
        </div>
    );

    const renderTitle = () => (
        <FormattedPlural
            value={props.count}
            one={<FormattedMessage id={props.title_one} />}
            other={<FormattedMessage id={props.title_many} />}
        />
    );

    const render = () => (
        <div className="">
            {renderTitle()}&nbsp;{renderCounter()}
        </div>
    );

    return render();
}