import withHover from '../components/HOCs/withHover';
import styled from 'styled-components';
import StandardText from '../components/shared/StandardText';
import Card from '../components/shared/Card';
import theme from './Theme';
export const H1 = styled(StandardText)`
    font-size: 30px;
    font-weight: 630;
    color: ${p => p.color};
`;

export const H2 = styled(StandardText)`
    font-size: 24px;
    font-weight: 400;
    color: ${p => p.color};
`;

export const ScrollBox = styled.div`
    overflow: scroll;
    height: ${p => p.height};
    width: ${p => p.width};
    
`;
const PreviewCardInternal = styled(Card)`
    width: 300px;
    padding: 8px;
    background-color: ${p => p.hover ? theme.lightGray : 'transparent'};
    cursor: pointer;

`;

export const ThinBorder = styled.div`
    border-style: solid;
    border-bottom-width: 1px;
    border-top-width: 0px;
    border-color: ${theme.gray30};
    margin: ${p => p.margin ?? 0};
    width: ${p => p.width ? p.width : null};
`;

export const ButtonContainer = styled.div`
    margin: 8px;
    width: 200px;
`;
export const PreviewCard = withHover(PreviewCardInternal);