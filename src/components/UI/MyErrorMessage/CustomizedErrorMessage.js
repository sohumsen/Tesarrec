import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function CustomizedErrorMessage(props) {

  return (
      <div >
      <Alert severity="error">
        <AlertTitle>{props.msg}</AlertTitle>
      </Alert>
      </div>

    
  );
}