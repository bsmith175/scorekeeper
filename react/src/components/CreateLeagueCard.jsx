import * as React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import { H2, PreviewCard } from '../Util/ViewUtil';
import CreateNewleagueModal from '../views/Modals/CreateNewLeagueModal';

const CreateLeagueCard = ({onSave}) => {
    const [isModalShowing, setIsModalShowing] = React.useState(false);
    return (
        <>
            <CreateNewleagueModal onSave={onSave} open={isModalShowing} handleClose={() => setIsModalShowing(false)}/>
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
