import * as React from 'react';
import styled from 'styled-components';
import Card from '../components/shared/Card';
import {H2, PreviewCard, ThinBorder} from '../Util/ViewUtil'
import theme from '../Util/Theme';
import StandardText from './shared/StandardText';
import AddIcon from '@material-ui/icons/Add';
import CreateNewLeagueModal from '../views/Modals/CreateNewLeagueModal';

const CreateLeagueCard = ({onSave}) => {
    const [isModalShowing, setIsModalShowing] = React.useState(false);
    return (
        <>
            <CreateNewLeagueModal onSave={onSave} open={isModalShowing} handleClose={() => setIsModalShowing(false)}/>
            <PreviewCard onClick={() => {setIsModalShowing(true)}}>
                <CenterDiv>
                    <AddIcon/>
                    <H2>
                        Create New League
                    </H2>
                </CenterDiv>
            </PreviewCard>
        </>
)};
export default CreateLeagueCard;



const CenterDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto;
`
