import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { H1, H2, ScrollBox, ButtonContainer } from '../../Util/ViewUtil';
import StandardText from '../../components/shared/StandardText';
import AddMemberModal from '../Modals/AddMemberModal';
import AddScoreModal from '../Modals/AddScoreModal';
import useQuery from '../../components/Hooks/useQuery';
import Card from '../../components/shared/Card';
import {formatIgnoreTimeZone, getAllDatesWithScore, scoreComparator } from '../../Util/Util';
import ScoreTable from './ScoreTable';
import {ThinBorder} from '../../Util/ViewUtil';
import DeleteLeagueModal from '../Modals/DeleteLeagueModal';
import { compareAsc, parseISO, isSameWeek, isSameMonth } from 'date-fns';
import Leaderboard from './Leaderboard';

const LeaguePage = () => {

    const [redirect, setRedirect] = React.useState(false);
    const [isMemberModalShowing, setIsMemberModalShowing] = React.useState(false);
    const [isScoreModalShowing, setIsScoreModalShowing] = React.useState(false);
    const [isDeleteModalShowing, setIsDeleteModalShowing] = React.useState(false);
    let { id } = useParams();
    const {data, loading, error, reQuery} = useQuery(`/leagues/${id}`);

    console.log(data);
    if (loading) {
        return (<H2>Loading</H2>);
    }
    if (redirect) return <Redirect to={{pathName: '/', state: {refresh: true}}}/>;

    const comparator = data && scoreComparator(data.scoreDirectionUp, data.scoreType);
    const dateMap = data && getAllDatesWithScore(data, comparator);
    const dates = data && Array.from(dateMap.keys()).sort((a, b) => compareAsc(new Date(b), new Date(a)));
    const today = new Date();
    const weekWins = {};
    const monthWins = {};
    const allTimeWins = {};
    if (dates && dateMap) {
        //initialize maps
        for (const user of data.leagueUsers) {
            weekWins[user.id] = 0;
            monthWins[user.id] = 0;
            allTimeWins[user.id] = 0;
        }

        for (const date of dates) {
                let winner = false; 
                let bestScore = false;
            for (const user of data.leagueUsers) {
                if ( dateMap.get(date).has(user.id) && (!bestScore || (comparator(dateMap.get(date).get(user.id).value, bestScore) > 0))) {
                    
                    winner = user.id;
                    bestScore = dateMap.get(date).get(user.id).value;
                }
            }
            if (isSameWeek(today, parseISO(date))) {
                weekWins[winner]++;
            }
            if (isSameMonth(today, parseISO(date))) {
                monthWins[winner]++;
            }
            allTimeWins[winner]++;
        }
    }
    return (
        data && 
        <Container>
            <AddMemberModal open={isMemberModalShowing} onSave={() => {reQuery()}} handleClose={() => setIsMemberModalShowing(false)} id={id}/>
            <AddScoreModal league={data} open={isScoreModalShowing} onSave={() => {reQuery()}} handleClose={() => setIsScoreModalShowing(false)} id={id}/>
            <DeleteLeagueModal handleClose={() => setIsDeleteModalShowing(false)} open={isDeleteModalShowing} league={data} onDelete={() => setRedirect(true)}/> 
            <HeaderContainer>
                <H1>{data.name}</H1>
                <StandardText>{data.leagueUsers.length} Members • Created {formatIgnoreTimeZone(parseISO(data.createdAt), 'MMM d, yyyy')} </StandardText>
            </HeaderContainer>
            <ThinBorder margin='8px'/>
            <RowContainer>
                <ScoreTable league={data} dateMap={dateMap} dates={dates}/>
                <Leaderboard league={data} weekWins={weekWins} monthWins={monthWins} allTimeWins={allTimeWins}/>
            </RowContainer>
            <RowContainer>
                <ButtonContainer>
                    <Button fullWidth variant='contained' onClick={() => {setIsMemberModalShowing(true)}}>
                        <StandardText>+ Add Member</StandardText>
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button fullWidth variant='contained' onClick={() => {setIsScoreModalShowing(true)}}>
                        <StandardText>+ Add score</StandardText>
                    </Button>
                </ButtonContainer>
            </RowContainer>
            <ButtonContainer>
                <Button color='secondary' fullWidth variant='contained' onClick={() => {setIsDeleteModalShowing(true)}}>
                    <StandardText>Delete League</StandardText>
                </Button>
            </ButtonContainer>
        </Container>

    )
}

export default LeaguePage;

const Container = styled.div`

`;

const HeaderContainer = styled.div`
    display: flex;
    height: 50px;
    justify-content: space-between;
    flex-direction: column;
    padding: 16px;
    padding-bottom: 8px;
`
const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`;