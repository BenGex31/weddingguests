import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function BasicTextFields({id, label, variant, defaultValue}) {

  return (
    <form noValidate autoComplete="off">
      <TextField required id={id} label={label} variant={variant} defaultValue={defaultValue} />
    </form>
  );
}
