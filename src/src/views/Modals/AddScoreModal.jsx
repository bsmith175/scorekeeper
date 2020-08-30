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

const commonProps = {
    margin: 'dense',
    fullWidth: true,
    required: true,
};

const AddScoreModal = ({ open, handleClickOpen, handleClose, onSave, league }) => {

    const [email, setEmail] = React.useState(null);
    const [score, setScore] = React.useState(null);
    //default current date
    const curDate = format(new Date(), FORMAT_DATE);
    const [date, setDate] = React.useState(curDate);

    //used for time score only
    const [min, setMin] = React.useState('0');
    const [sec, setSec] = React.useState('0');
    const isTimeScore = league.scoreType === scoreTypes.TIME;
    function getLeagueUserId() {
      return getLeagueUserFromEmail(email, league).id;
    }
    
    async function handleSubmit() {

      function createScore() {
        const time = new Date();
          time.setHours(0, parseInt(min), parseInt(sec));
          console.log(format(time, FORMAT_TIME_SCORE));
          debugger;
          return (format(time, FORMAT_TIME_SCORE));
      }
        const scoreToSend = isTimeScore ? createScore() : score;
        doFetch('POST', '/score', {scoreType: league.scoreType, score: scoreToSend, date, leagueId: league.id, leagueUserId: getLeagueUserId()}).then(() => {onSave(); handleClose()});
    }
    
      function makeScoreInput() {
      if (isTimeScore) {
        return (
          <TimeScoreRow>
            <TextField
                {...commonProps}
                label="Minutes"
                value={min || ''}
                onChange={(event) => setMin(event.target.value)}>
            </TextField> 
            <TextField
                {...commonProps}
                label="Seconds"
                value={sec || ''}
                onChange={(event) => setSec(event.target.value)}>
            </TextField> 
          </TimeScoreRow>
        ) 
      } else {
        return (
            <TextField
                {...commonProps}
                label="Score"
                value={score || ''}
                onChange={(event) => setScore(event.target.value)}>
            </TextField> 
        )
      }
    }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="add-member-dialog">Add Score</DialogTitle>
        <FieldContainer>
            <Autocomplete
              id="auto-complete"
              options={league.leagueUsers}
              getOptionLabel={(option) => option.user.email}
              onChange={(event, values) => setEmail(values.user.email)}
              renderInput={(params) => 
              <TextField {...params} 
                {...commonProps}
                label="Your email" 
                value={email || ''}/>}
            />
            <TextField
              {...commonProps}
              label="Date"
              type='date'
              defaultValue={curDate}
              onChange={(event) => setDate(event.target.value)}
              >
              </TextField>       
            {makeScoreInput()}
        </FieldContainer>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddScoreModal;


const FieldContainer = styled(DialogContent)`
    width: 400px;
    margin-top: 16px;
`;

const TimeScoreRow = styled.div`
  display: flex;
  flex-direction: row;
`;