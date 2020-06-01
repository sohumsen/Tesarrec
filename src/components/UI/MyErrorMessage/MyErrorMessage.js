import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function MyErrorMessage() {

  return (
      <div style={{height:"5px"}}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
      </Alert>
      </div>

    
  );
}