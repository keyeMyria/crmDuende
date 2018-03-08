import * as React from 'react';

export function ModalContainer (props: React.Props<HTMLDivElement>) {
    return (
      <div {...props} className="form-group veh-general-form">
        {props.children}
      </div>
    );
}
