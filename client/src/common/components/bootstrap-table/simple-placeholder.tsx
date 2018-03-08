import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function simplePlaceholderFormatter (cell: any, row: {}, {placeholder}: { placeholder?: string}) {
    return !!cell ? cell : (
        <FormattedMessage id={placeholder || 'global.not_available'}>
            {
                (text: string) => (
                    <label style={{opacity: 0.5}}>
                        {text}
                    </label>
                )
            }
        </FormattedMessage>
    );
}
