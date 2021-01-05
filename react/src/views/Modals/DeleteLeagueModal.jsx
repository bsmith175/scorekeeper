import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { H2 } from '../../Util/ViewUtil';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';
import { doFetch, FORMAT_DATE, getAllDatesWithScore, scoreTypes, FORMAT_TIME_SCORE } from '../../Util/Util';
import format from 'date-fns/format';
import { formatISO } from 'date-fns';
import { getLeagueUserFromEmail } from '../../Util/UserUtil';
import StandardText from '../../components/shared/StandardText';

const commonProps = {
    margin: 'dense',
    fullWidth: true,
    required: true,
};

const DeleteLeagueModal = ({ open, handleClose, onDelete, league }) => {

    async function doDelete() {

        doFetch('DELETE', `/leagues/${league.id}`);
        onDelete();
        handleClose();
    }
    
    return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="add-member-dialog">Are you sure?</DialogTitle>
            <TextContainer>
                <StandardText>The league will be permanently deleted and all saved 
                    scores will be lost.
                </StandardText>
            </TextContainer>
        <FieldContainer>
            <ButtonContainer>
                <Button  variant='contained' onClick={() => handleClose()} >
                    <StandardText>Cancel</StandardText>
                </Button>
            </ButtonContainer>
            <ButtonContainer>
                <Button  variant='contained' color='secondary' onClick={() => doDelete()} >
                    <StandardText>Delete</StandardText>
                </Button>
            </ButtonContainer>
        </FieldContainer>
      </Dialog>
    </div>
  );
}

export default DeleteLeagueModal;


const FieldContainer = styled(DialogContent)`
    width: 200px;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
`;

const ButtonContainer = styled.div`
    margin-right: 8px;
`;
const TextContainer = styled(DialogContent)`
    width: 200px;
`;