import * as React from 'react';
import styled from 'styled-components';
import {RowSection, H2, ScrollBox, ThinBorder, RowContainer } from '../../Util/ViewUtil';
import StandardText from '../../components/shared/StandardText';
import Card from '../../components/shared/Card';

const COLUMN_WIDTH = '120';
const TABLE_WIDTH = COLUMN_WIDTH * 4;

//data is map with key: member id, value: list of best, worst, average scores
const MembersCard = ({ league, data }) => {
    const Header = () => (
        <>
            <RowContainer hover={false}>
                <H2>Participants</H2>
            </RowContainer>
            <RowContainer hover={false}>
                <RowSection key='1'>
                    <StandardText>Name</StandardText>
                </RowSection>            
                <RowSection key='2'>
                    <StandardText>Best score</StandardText>
                </RowSection>            
                <RowSection key='3'>
                    <StandardText>Worst score</StandardText>
                </RowSection>            
                <RowSection key='4'>
                    <StandardText>Average score</StandardText>
                </RowSection>            
            </RowContainer>
        </>
    );

    function makeUserRows() {
        return (
            league.leagueUsers.map((leagueUser) => (
               <div key={leagueUser.id}> 
                    <RowContainer width={TABLE_WIDTH}>
                       <RowSection key={'name'}>
                            <StandardText>{leagueUser.user.firstName}</StandardText>  
                       </RowSection> 
                       {data[leagueUser.id].map((val, ix) => (
                           <RowSection key={ix}>
                               <StandardText>{val}</StandardText>
                           </RowSection>
                       ))}
                   </RowContainer>
                    <ThinBorder width={TABLE_WIDTH}/>
               </div>
            ))
        )
    }
    return (data &&
        <Container height='400px' width={`${TABLE_WIDTH}px`}>
            <ScrollBox>
                    <Header/>
                    <ThinBorder width={TABLE_WIDTH}/>
                    {makeUserRows()}
            </ScrollBox>
        </Container>
    )
}

export default MembersCard;

const Container = styled(Card)`
    position: relative
`;
