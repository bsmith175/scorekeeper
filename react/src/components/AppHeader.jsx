import * as React from 'react';
import styled from 'styled-components';
import LoginButton from './LoginButton'
import { Link } from 'react-router-dom';
import {H1} from './../Util/ViewUtil'
import theme from '../Util/Theme';
const AppHeader = props => {
    return (
        <Container>
            <Link to={'/'}>
                <H1 color={theme.lightGray} style={{display: 'inline-block', margin: '17px 0px'}}>
                    Home
                </H1>
            </Link>

            <LoginButton/>
        </Container>
    );
};

export default AppHeader;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: black;
    height: 60px;
    ${theme.underShadow}
    padding: 0 16px;
`;




