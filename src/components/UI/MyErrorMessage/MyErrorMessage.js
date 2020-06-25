import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import classes from './MyErrorMessage.module.css'

export default function MyErrorMessage() {

  return (
      <div className={classes.error}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
      </Alert>
      </div>

    
  );
}