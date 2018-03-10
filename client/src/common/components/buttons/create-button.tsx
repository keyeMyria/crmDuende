import * as React from 'react';

export function CreateButton(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} className="btn btn-primary">
      Crear
    </button>
  );
}
