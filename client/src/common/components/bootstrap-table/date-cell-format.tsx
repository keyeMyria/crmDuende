import * as React from 'react';
import { isPast } from 'date-fns';
import { FormattedMessage } from 'react-intl';
import dateFormat, { fromNow } from '../../util/format-date';

const toMiliSeconds: number = 1000;

interface FormatExtraDataProps {
    canExpire?: boolean;
    format?: string;
    forceDate?: boolean;
    placeholder?: JSX.Element | string;
}

export default function DateCellFormat(date: string | number, row: {}, formatExtraData: FormatExtraDataProps) {

    const { forceDate = false, canExpire = false, format = 'DD-MMM-YYYY' } = formatExtraData || {};
    const dates = (forceDate && typeof date === 'string') ? date.substr(0, 10)
        : (typeof date === 'number' ? toMiliSeconds * date : date);

    const renderWithExpiration = () => {
        const isExpired = isPast(dates);
        return (
            <span style={{ color: isExpired && 'red' }}>
                {
                    isExpired
                        ? <FormattedMessage
                            id="global.dates.expired_ago"
                            values={{ timeAgo: fromNow(date) }}
                        />
                        : dateFormat(dates, format)
                }
            </span>
        );
    };

    const renderPlain = () => dateFormat(dates, format);

    if (date) {
        return canExpire ? renderWithExpiration() : renderPlain();
    } else {
        if (formatExtraData) {
            return formatExtraData.placeholder || '';
        } else {
            return '';
        }
    }
}