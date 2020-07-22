import * as React from 'react';
import styled from 'styled-components';


const Card = styled.div`
    display: flex;
    flex-direction: column;
    height: 96px;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 8px;
    margin: 8px;
    box-shadow: 0px 1px 1px rgba(46, 49, 52, 0.54);
    elevation: 1;
    width: ${p => p.width};
    height: ${p => p.height};

`;

export default Card;


