import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

export default class ReviewDialog extends React.Component {
    // const [open, setOpen]: React.useState(false);


   handleClickOpen = () => {
   this.setState({
       open: !this.state.open
   })
  };

   handleClose = () => {
    this.setState({
        open: !this.state.open
    })
  };

  state = {
      open: true
  }

  static = {
      dialogOpen: PropTypes.bool
  }



  render () {
  return (
    <div>
      <Dialog
        open={this.state.open && this.props.dialogOpen}
        onClose={() => this.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Review Swap"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Disagree
          </Button>
          <Button onClick={() => this.handleClose()} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
}