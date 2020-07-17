import React from "react";
import Alert from '@material-ui/lab/Alert';
export default function CustomizedErrorMessage(props) {
  return (
    <Alert variant="outlined" severity="error">
      {props.msg}
    </Alert>
  );
}
