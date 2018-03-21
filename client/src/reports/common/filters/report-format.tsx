import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export enum REPORT_FORMAT { WEBFULL = 'json', WEBSUMMARY = 'jsonsum', EXCEL = 'xls', EARTH = 'kml', ESRI = 'shp' }

interface ReportFormatProps {
    availableTypes: string[];
    value: string;
    valueName?: string;
    onClick(type: string, valueName?: string): void;
}

export function ReportFormat (props: ReportFormatProps) {

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const type = event.currentTarget.id;
        props.onClick(type, props.valueName);
    };

    const getIntlID = (type: string) => {
        switch (type) {
            case REPORT_FORMAT.WEBFULL:
                return 'common.report_format.web_full';
            case REPORT_FORMAT.WEBSUMMARY:
                return 'common.report_format.web_sum';
            case REPORT_FORMAT.EXCEL:
                return 'common.report_format.excel';
            case REPORT_FORMAT.EARTH:
                return 'common.report_format.earth';
            default:
                return 'common.report_format.esri';
        }
    };

    const renderType = (type: string) => (
        <label key={`rt-${type}`} className="label-checkbox" htmlFor={type}>
            <input type="radio" id={type} checked={type === props.value} onChange={handleClick} />&nbsp;
            <FormattedMessage id={getIntlID(type)}>
                {(text: string) => (
                    <label htmlFor={type}>{text}</label>
                )}
            </FormattedMessage>
        </label>
    );

    const renderTypes = (types: string[]) => types.map( type => renderType(type));

    return (
        <span style={{lineHeight: '34px'}}>
            {renderTypes(props.availableTypes)}
        </span>
    );
}
