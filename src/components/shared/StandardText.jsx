import * as React from 'react';
import styled from 'styled-components';

const StandardText = props => {
    return (
        <StandardStyles style={props.style} className={props.className}>
            {props.children}
        </StandardStyles>
    )

}


export default StandardText;
const StandardStyles = styled.text`
    class-name=${p => p.className};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 20px;
`;

