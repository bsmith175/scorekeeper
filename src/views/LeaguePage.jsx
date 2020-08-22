import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { H2 } from '../shared/ViewUtil';
import StandardText from '../components/shared/StandardText';
import AddMemberModal from './Modals/AddMemberModal';

const LeaguePage = ({ data }) => {

    const [redirect, setRedirect] = React.useState(false);
    const [isModalShowing, setIsModalShowing] = React.useState(false);

    let { id } = useParams();
    const leagueData = data && data[id - 1];

    return (
        <Container>
            <AddMemberModal open={isModalShowing} onSave={() => {}} handleClose={() => setIsModalShowing(false)} id={id}/>
            <Button onClick={() => {setIsModalShowing(true)}}>
                <StandardText>+ Add Member</StandardText>
            </Button>
        </Container>

    )
}

export default LeaguePage;

const Container = styled.div`

`;
