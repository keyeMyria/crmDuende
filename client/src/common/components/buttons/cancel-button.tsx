import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function CancelButton(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} className="btn btn-default">
      <FormattedMessage id="global.cancel" />
    </button>
  );
}
