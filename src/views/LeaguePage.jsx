import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { H2 } from '../shared/ViewUtil';
import StandardText from '../components/shared/StandardText';

const LeaguePage = ({ data }) => {
    const [redirect, setRedirect] = React.useState(false);
    let { id } = useParams();
    const leagueData = data[id - 1];

    return (
        <Container>
            <Button onClick={}>
                <StandardText>+ Add Member</StandardText>
            </Button>
        </Container>

    )
}

export default LeaguePage;

const Container = styled.div`

`;
