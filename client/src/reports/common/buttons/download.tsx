import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import '../resources/styles/download.css';

export interface DownloadProps {
    isDownloading?: boolean;
    disabled?: boolean;
    onClick?(): void;
}

export function Download(props: DownloadProps) {

    const getClassNames = (shouldDisabled?: boolean) => `btn btn-primary ${shouldDisabled && 'disabled-btn'}`; 

    const downloadingText = () => (
        <FormattedMessage id="common.downloading">
            {(text: string) => (
                <div
                    className={getClassNames(props.isDownloading)}
                >
                    {text} <i className="downloading-spinner" />
                </div>
            )}
        </FormattedMessage>
    );

    const downloadText = () => (
        <FormattedMessage id="common.download">
            {(text: string) => (
                <div
                    tabIndex={0}
                    className={getClassNames(props.disabled)}
                    onClick={props.disabled ? undefined : props.onClick}
                >
                    {text}
                </div>
            )}
        </FormattedMessage>

    );

    return props.isDownloading ? downloadingText() : downloadText();
}
