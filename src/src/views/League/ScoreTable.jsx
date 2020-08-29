import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { H2, ScrollBox, ThinBorder } from '../../Util/ViewUtil';
import StandardText from '../../components/shared/StandardText';
import AddMemberModal from '../Modals/AddMemberModal';
import useQuery from '../../components/Hooks/useQuery';
import Card from '../../components/shared/Card';
import { getAllDatesWithScore, formatIgnoreTimeZone } from '../../Util/Util';
import theme from '../../Util/Theme';
import { format, compareAsc } from 'date-fns';
import { parseISO } from 'date-fns/esm';

const ROW_HEIGHT = '20';
const COLUMN_WIDTH = '90';
const TABLE_WIDTH = '400';
const ScoreTable = ({ league }) => {

    const dateMap = getAllDatesWithScore(league);
    const borderWidth = `${COLUMN_WIDTH * (1 + dateMap.size)}px`; 
    const dates = Array.from(dateMap.keys()).sort((a, b) => compareAsc(new Date(b), new Date(a)));
    console.log(dateMap);
    const Header = () => (
        <RowContainer>
            <RowSection key='1'>
                <StandardText>Name</StandardText>
            </RowSection>            
            {dates.map((date) => {
                return (
                <RowSection key={date}>
                    <StandardText color={theme.gray50}>{formatIgnoreTimeZone(parseISO(date), 'MMM d')}</StandardText>
                </RowSection>)
            })}
        </RowContainer>
    );
    function makeUserRows() {
        return (
            league.leagueUsers.map((leagueUser) => (
               <React.Fragment key={leagueUser.id}> 
                    <RowContainer>
                       <RowSection key={'name'}>
                            <StandardText>{leagueUser.user.firstName}</StandardText>  
                       </RowSection> 
                    {dates.map((date) => {
                        debugger;
                        return (
                            <RowSection key={date}>
                                <StandardText>{dateMap.get(date).get(leagueUser.id)?.value ?? '--'}</StandardText>
                            </RowSection>
                        )
                   })}
                   </RowContainer>
                    <ThinBorder width={borderWidth}/>
               </React.Fragment>
            ))
        )
    }
    return (dateMap &&
        <Container height='200px' width={`${TABLE_WIDTH}px`}>
            <ScrollBox>
                    <Header/>
                    <ThinBorder width={borderWidth}/>
                    {makeUserRows()}
            </ScrollBox>
        </Container>
    )
}

export default ScoreTable;

const Container = styled(Card)`
    padding-left: 8px;
    position: relative
`;

const RowContainer = styled.div`
    height: ${ROW_HEIGHT}px;
    position: relative;
    left: 0;
    right: 0;
    display: flex;
    flex: 0 0 auto;
    padding-top: 8px;
    padding-bottom: 8px;
`
const RowSection = styled.div`
   min-width: ${COLUMN_WIDTH}px;

`;