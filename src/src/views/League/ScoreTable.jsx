import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { H2, ScrollBox } from '../../Util/ViewUtil';
import StandardText from '../../components/shared/StandardText';
import AddMemberModal from '../Modals/AddMemberModal';
import useQuery from '../../components/Hooks/useQuery';
import Card from '../../components/shared/Card';

const ScoreTable = () => {

    const [redirect, setRedirect] = React.useState(false);
    const [isModalShowing, setIsModalShowing] = React.useState(false);

    let { id } = useParams();
    const {data, loading, error, reQuery} = useQuery(`/leagues/${id}`);

    console.log(data);
    if (loading) {
        return (<H2>Loading</H2>);
    }

    return (
        <Container>
            <AddMemberModal open={isModalShowing} onSave={() => {}} handleClose={() => setIsModalShowing(false)} id={id}/>
            <Button onClick={() => {setIsModalShowing(true)}}>
                <StandardText>+ Add Member</StandardText>
            </Button>
            <Card width='100' height='100'>
                <ScrollBox>

                </ScrollBox>
            </Card>
 
        </Container>

    )
}

export default ScoreTable;

const Container = styled.div`

`;
