import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { H2, ScrollBox } from '../../Util/ViewUtil';
import StandardText from '../../components/shared/StandardText';
import AddMemberModal from '../Modals/AddMemberModal';
import AddScoreModal from '../Modals/AddScoreModal';
import useQuery from '../../components/Hooks/useQuery';
import Card from '../../components/shared/Card';

const LeaguePage = () => {

    const [redirect, setRedirect] = React.useState(false);
    const [isMemberModalShowing, setIsMemberModalShowing] = React.useState(false);
    const [isScoreModalShowing, setIsScoreModalShowing] = React.useState(false);
    let { id } = useParams();
    const {data, loading, error, reQuery} = useQuery(`/leagues/${id}`);

    console.log(data);
    if (loading) {
        return (<H2>Loading</H2>);
    }

    return (
        data && 
        <Container>
            <AddMemberModal open={isMemberModalShowing} onSave={() => {}} handleClose={() => setIsMemberModalShowing(false)} id={id}/>
            <AddScoreModal league={data} open={isScoreModalShowing} onSave={() => {}} handleClose={() => setIsScoreModalShowing(false)} id={id}/>

            <Button onClick={() => {setIsMemberModalShowing(true)}}>
                <StandardText>+ Add Member</StandardText>
            </Button>
            <Button onClick={() => {setIsScoreModalShowing(true)}}>
                <StandardText>Enter your score</StandardText>
            </Button>
            <Card width='100px' height='100px'>
                <ScrollBox>

                </ScrollBox>
            </Card>
 
        </Container>

    )
}

export default LeaguePage;

const Container = styled.div`

`;
