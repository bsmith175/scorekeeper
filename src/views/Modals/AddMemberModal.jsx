import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { H2 } from '../../shared/ViewUtil';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';
import { doFetch } from '../../shared/Util';

const commonProps = {
    autoFocus: true,
    margin: 'dense',
    fullWidth: true,
    required: true,
};

const AddMemberModal = ({ open, handleClickOpen, handleClose, onSave }) => {

    function handleSubmit() {
        console.log(leagueName + scoreType + scoreDirection);
        doFetch('POST', '/leagues', {name: leagueName, scoreType: scoreType, scoreDirectionUp: scoreDirection === "Highest score wins"}).
        then(() => {onSave(); handleClose()});
    }


  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="add-member-dialog">Add Member</DialogTitle>
        <FieldContainer>
            <TextField
                {...commonProps}
                label="League name"
                onChange={event => setLeagueName(event.target.value)}
            />
            <TextField
                {...commonProps}
                label="Score type"
                select
                value={scoreType}
                onChange={(event) => {setScoreTypes(event.target.value)}}>
                {scoreTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
            <TextField
                {...commonProps}
                label="Score direction"
                select
                value={scoreDirection}
                onChange={(event) => {setScoreDirection(event.target.value)}}>
                <MenuItem key='highest' value='Highest score wins'>
                    Highest score wins
                </MenuItem>
                <MenuItem key='lowest' value='Lowest score wins'>
                Lowest score wins
                </MenuItem>
            </TextField>          
        </FieldContainer>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create league
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddMemberModal;

const MemberFields = ({index}) => {
    const commonProps = {
        autoFocus: true,
        margin: 'dense',
        fullWidth: true
    }
    return (
        <FieldContainer>
            <H2>Player {index}</H2>
            <TextField
                {...commonProps}
                label="Name"/>
            <TextField
            {...commonProps}
            label="Email Address"
          />
        </FieldContainer>

    )
}

const FieldContainer = styled(DialogContent)`
    width: 400px;
    margin-top: 16px;
`;