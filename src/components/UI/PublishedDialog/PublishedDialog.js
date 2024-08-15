import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open ] = React.useState(true);

  return (
    <div>
    
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onCancelPublish}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Publish model?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Once published it cannot be editted or deleted and will be open to
            other users. This process cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancelPublish} color="primary">
            Maybe later
          </Button>
          <Button onClick={props.onPublishModel} color="primary">
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
