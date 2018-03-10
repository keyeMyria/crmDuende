import * as React from 'react';

export function CancelButton(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} className="btn btn-default">
      Cancelar
    </button>
  );
}
