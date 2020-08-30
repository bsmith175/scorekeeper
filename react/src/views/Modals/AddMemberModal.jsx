import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { H2 } from '../../Util/ViewUtil';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';
import { doFetch } from '../../Util/Util';

const commonProps = {
    autoFocus: true,
    margin: 'dense',
    fullWidth: true,
    required: true,
};

const AddMemberModal = ({ open, handleClickOpen, handleClose, onSave, id }) => {

    const [email, setEmail] = React.useState(null);
    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);

    
    function handleSubmit() {
      doFetch('POST', '/leagueUser', {email, firstName, lastName, leagueId: id}).then(() => {onSave(); handleClose()});

    }


  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="add-member-dialog">Add Member</DialogTitle>
        <FieldContainer>
          This person will be sent an email inviting them to join the league.
            <TextField
                {...commonProps}
                label="First name"
                value={firstName || ''}
                onChange={(event) => setFirstName(event.target.value)}>
            </TextField>
            <TextField
                {...commonProps}
                label="Last name"
                value={lastName || ''}
                onChange={(event) => setLastName(event.target.value)}>
            </TextField>
            <TextField
                {...commonProps}
                label="Email"
                value={email || ''}
                onChange={(event) => setEmail(event.target.value)}>
            </TextField>          
        </FieldContainer>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddMemberModal;


const FieldContainer = styled(DialogContent)`
    width: 400px;
    margin-top: 16px;
`;