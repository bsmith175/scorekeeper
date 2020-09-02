import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { H2, ScrollBox, ButtonContainer } from '../../Util/ViewUtil';
import StandardText from '../../components/shared/StandardText';
import AddMemberModal from '../Modals/AddMemberModal';
import AddScoreModal from '../Modals/AddScoreModal';
import useQuery from '../../components/Hooks/useQuery';
import Card from '../../components/shared/Card';
import { getAllDatesWithScore } from '../../Util/Util';
import ScoreTable from './ScoreTable';
import DeleteLeagueModal from '../Modals/DeleteLeagueModal';

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
    if (redirect) return <Redirect to='/'/>;
    return (
        data && 
        <Container>
            <AddMemberModal open={isMemberModalShowing} onSave={() => {reQuery()}} handleClose={() => setIsMemberModalShowing(false)} id={id}/>
            <AddScoreModal league={data} open={isScoreModalShowing} onSave={() => {reQuery()}} handleClose={() => setIsScoreModalShowing(false)} id={id}/>
            <DeleteLeagueModal handleClose={() => setIsDeleteModalShowing(false)} open={isDeleteModalShowing} league={data} onDelete={() => setRedirect(true)}/> 
            <ScoreTable league={data}/>
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
