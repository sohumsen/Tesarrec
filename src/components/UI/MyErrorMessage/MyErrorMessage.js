import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function MyErrorMessage() {

  return (
      <div >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
      </Alert>
      </div>

    
  );
}