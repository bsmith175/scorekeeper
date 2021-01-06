import * as React from 'react';
import withHover from '../components/HOCs/withHover';
import styled from 'styled-components';
import StandardText from '../components/shared/StandardText';
import Card from '../components/shared/Card';
import theme from './Theme';

export const COLUMN_WIDTH = '90';
export const ROW_HEIGHT = '20';

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
export const ButtonText = styled(StandardText)`
    font-size: 14px;
    font-weight: 600;
`;

export const ScrollBox = styled.div`
    overflow: scroll;
    height: ${p => p.height};
    min-height: ${p => p.min_height};
    width: ${p => p.width};
    display: flex;
    flex-direction: column;
    
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

const RowContainerInternal = styled.div`
    height: ${ROW_HEIGHT}px;
    position: relative;
    left: 0;
    right: 0;
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    width: ${p => p.width};
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: ${p => p.hover ? theme.lightGray : 'transparent'};
`;

export const RowSection = styled.div`
   min-width: ${p => p.minWidth ?? COLUMN_WIDTH}px;
`;
const RowContainerBase = (props) => {
    if (props.zIndex != undefined) {
        props.setZIndex(props.zIndex)
    }
    return <RowContainerInternal hover={props.hover} {...props}/>
}

export const RowContainer = withHover(RowContainerBase);
