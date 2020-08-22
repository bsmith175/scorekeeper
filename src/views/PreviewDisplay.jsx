import * as React from 'react';
import styled from 'styled-components';
import Card from '../components/shared/Card';
import LeaguePreview from '../components/LeaguePreview';
import CreateLeagueCard from '../components/CreateLeagueCard';
import { Modal } from '@material-ui/core';
import { doFetch } from '../shared/Util';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PreviewDisplay = ({data, getData}) => {
    return (
        <Container>
            {data && data.map((item) => (
                <LeaguePreview
                key={item.id}
                leagueID={item.id}
                title={item.name}
                leaderName={item.leader}
                leaderScore={item.leaderScore}
                allTimeName={item.allTimeWinner}
                allTimeScore={null}
                update={null}
                isNew={!!!data.LeagueUsers}/>
            ))}
            <LeaguePreview 
            leagueID={5}
            title='Mini Crossword'
            leaderName='Ashley'
            leaderScore='0:44'
            allTimeName='Andy'
            allTimeScore='0:26'
            updated='6/30'/>
            <CreateLeagueCard onSave={getData}/>

        </Container>
    );
};

export default PreviewDisplay;


const Container = styled.div`
    display: flex;  
    flex-wrap: wrap;
    flex-direction: row;
`;




