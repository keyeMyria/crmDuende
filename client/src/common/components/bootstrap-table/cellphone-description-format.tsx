import * as React from 'react';
import { Cellphone } from '../../../cellphones-manager/types/index';
import { FormattedMessage } from 'react-intl';

interface DescriptionProps {
    cellphone: Cellphone;
}

export default function (props: DescriptionProps) {
    let { make, model, description, registered } = props.cellphone;
    return (
        <div>
            <div>
                {description}
            </div>
            <div className="description">
                {
                    !!registered === false && (
                        <div className="badge-blocked">
                            <FormattedMessage id="cellphones.blocked" />
                        </div>
                    )
                }
                <span> {make} &nbsp;&bull;&nbsp; {model} </span>

            </div>
        </div>
    );
}