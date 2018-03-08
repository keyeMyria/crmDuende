import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function CreateButton(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} className="btn btn-primary">
      <FormattedMessage id="global.create" />
    </button>
  );
}
