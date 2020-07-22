import * as React from 'react';
import styled from 'styled-components';
import Card from '../components/shared/Card';
import {H2, PreviewCard, ThinBorder} from '../shared/ViewUtil'
import theme from '../shared/Theme';
import StandardText from './shared/StandardText';
import { Link, Redirect } from 'react-router-dom';

const LeaguePreview = ({id, title, leaderName, isNew, leaderScore, allTimeName, allTimeScore, updated }) => {
    const [redirect, setRedirect] = React.useState(false);
    console.log(id);

    return (
            <PreviewCard 
            onClick={() => setRedirect(true)}
            >
                {redirect && <Redirect to={`/league/${id}`}/>}
                <Header>
                    <H2>
                        {title}
                    </H2>   
                    <MyText>
                        {updated}
                    </MyText>
                </Header>

                <ThinBorder margin='3px 0px'/>
                {isNew ? 
                (<MyText>
                    Click to add members!
                </MyText>) :
                <>
                    <MyText>
                        Today's leader: {leaderName} · {leaderScore}
                    </MyText>
                    <MyText>
                        All-time: {allTimeName} · {allTimeScore}
                    </MyText>
                </>}
            </PreviewCard>        
)};


const MyText = styled(StandardText)`
        color: ${theme.gray50};
        margin-top: 4px;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
`
export default LeaguePreview;
