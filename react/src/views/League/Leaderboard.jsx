import * as React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ButtonText, H2, ScrollBox, ThinBorder, RowContainer} from '../../Util/ViewUtil';
import StandardText from '../../components/shared/StandardText';
import useQuery from '../../components/Hooks/useQuery';
import Card from '../../components/shared/Card';
import { getAllDatesWithScore, formatIgnoreTimeZone, scoreTypes, parseScore, scoreComparator } from '../../Util/Util';
import theme from '../../Util/Theme';
import { format, compareAsc } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import withHover from '../../components/HOCs/withHover';

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
            <RowContainer zIndex={1} hover={false}>
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
            <RowContainer zIndex={0} hover={false}>
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
    return (
        <Container height='400px' width={`${TABLE_WIDTH}px`}>
        {/* <Container height={`${ROW_HEIGHT * 2 * league.leagueUsers.length + 60}px`} width={`${TABLE_WIDTH}px`}> */}
            <ScrollBox min_height='200px'>
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
            {TIME_PERIODS.map((txt, ix) => (
                <SelectRow key={ix} onClick={() => onClick(ix)}>
                    <StandardText color={option === ix ? 'black' : theme.gray50}>{txt}</StandardText>
                </SelectRow>
            ))}
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
    cursor: pointer;
`;
const Container = styled(Card)`
    position: relative;
`;

const SelectRowBase = styled.div`
    padding: 4px 8px;
    border-bottom: 1px solid ${theme.lightGray};
    background-color: ${p => p.hover ? theme.lightGray : 'transparent'};
    cursor: pointer;
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
    z-index: 1;

`