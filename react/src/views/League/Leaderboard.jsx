import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ButtonText, H2, ScrollBox, ThinBorder } from '../../Util/ViewUtil';
import StandardText from '../../components/shared/StandardText';
import useQuery from '../../components/Hooks/useQuery';
import Card from '../../components/shared/Card';
import { getAllDatesWithScore, formatIgnoreTimeZone, scoreTypes, parseScore, scoreComparator } from '../../Util/Util';
import theme from '../../Util/Theme';
import { format, compareAsc } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import withHover from '../../components/HOCs/withHover';

const ROW_HEIGHT = '20';
const COLUMN_WIDTH = '90';
const TABLE_WIDTH = COLUMN_WIDTH * 3;
const TIME_PERIODS = ['This Week', 'This Month', 'All Time']

//time_frame: player: num_wins
const Leaderboard = ({ league, weekWins, monthWins, allTimeWins}) => {
    // const borderWidth = `${Math.max(TABLE_WIDTH, COLUMN_WIDTH * 2)}px`; 
    const data = [weekWins, monthWins, allTimeWins];
    const [showDropdown, setShowDropdown] = React.useState(false)
    const [timePeriodOption, setTimePeriodOption] = React.useState(0);
    const Header = () => (
        <>
            <RowContainer>
                <H2>Leaderboard</H2>
                <TimePeriodContainer>
                    <TimePeriodButton clicked={showDropdown} onClick={() => setShowDropdown(!showDropdown)}>
                        {TIME_PERIODS[timePeriodOption]}
                    </TimePeriodButton>
                    {showDropdown && (
                        <Dropdown setShowDropdown={setShowDropdown} setOption={setTimePeriodOption} option={timePeriodOption}/>
                    )}
                </TimePeriodContainer>
            </RowContainer>
            <RowContainer>
                <RowSection key='1'>
                    <StandardText>Name</StandardText>
                </RowSection>            
                <RowSection key='2'>
                    <StandardText>Wins</StandardText>
                </RowSection>            
            </RowContainer>
        </>
    );

    function makeRows() {
        return (
            league.leagueUsers.map((leagueUser) => (
               <React.Fragment key={leagueUser.id}> 
                    <RowContainer>
                       <RowSection key={'name'}>
                            <StandardText>{leagueUser.user.firstName}</StandardText>  
                       </RowSection> 
                       <RowSection key={'wins'}>
                           <StandardText>{data[timePeriodOption][leagueUser.id] ?? 0}</StandardText>
                       </RowSection>
                   </RowContainer>
                    <ThinBorder width={TABLE_WIDTH}/>
               </React.Fragment>
                
            ))
        );
    }
    console.log(league.leagueUsers.length)
    return (
        <Container height='400px' width={`${TABLE_WIDTH}px`}>
        {/* <Container height={`${ROW_HEIGHT * 2 * league.leagueUsers.length + 60}px`} width={`${TABLE_WIDTH}px`}> */}
            <ScrollBox>
                    <Header/>
                    <ThinBorder width={TABLE_WIDTH}/>
                    {makeRows()}
            </ScrollBox>
        </Container>
    )
}

export default Leaderboard;

const TimePeriodButtonBase = (props) => {
    const {hover, clicked, onClick} = props;
    return (
        <DropDownButton onClick={onClick} height='20px'  hover={hover}>
            <ButtonText color={hover || clicked ? 'black' : theme.gray50}>{props.children}</ButtonText>
        </DropDownButton>
    )
}
const Dropdown = ({setShowDropdown,  setOption, option}) => {
    const onClick = (option) => {
        setOption(option);
        setShowDropdown(false);
    }
    return (
        <DropdownContainer>
            {TIME_PERIODS.map((_, ix) => (
                <SelectRow key={ix} onClick={() => onClick(ix)}>
                    <StandardText color={option === ix ? 'black' : theme.gray50}>{TIME_PERIODS[ix]}</StandardText>
                </SelectRow>
            ))}
            {/* <SelectRow >
                <StandardText color={option === 0 ? 'black' : theme.gray50}>{TIME_PERIODS[0]}</StandardText>
            </SelectRow>
            <SelectRow>
                <StandardText color={option === 1 ? 'black' : theme.gray50}>{TIME_PERIODS[1]}</StandardText>
            </SelectRow>
            <SelectRow>
                <StandardText color={option === 2 ? 'black' : theme.gray50}>{TIME_PERIODS[2]}</StandardText>
            </SelectRow> */}

        </DropdownContainer>
    );
}
const TimePeriodButton = withHover(TimePeriodButtonBase);
const DropDownButton = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: ${p => p.hover ? theme.lightGray : 'transparent'};
    padding: 4px 8px;
    height: ${p => p.height};
    width: ${p => p.width};
`;
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
    justify-content: space-between;
    padding-top: 8px;
    padding-bottom: 8px;
`;
const SelectRowBase = styled.div`
    padding: 4px 8px;
    border-bottom: 1px solid ${theme.lightGray};
    background-color: ${p => p.hover ? theme.lightGray : 'transparent'};
`;
const SelectRow = withHover(SelectRowBase);
const RowSection = styled.div`
   min-width: ${COLUMN_WIDTH}px;

`;
const TimePeriodContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 8px;
`;

const DropdownContainer = styled(Card)`
    background: white;
    z-index: 4;

`