import styled from 'styled-components/';
import * as React from 'react';
import {useState} from 'react';


export default (BaseComponent) => {

  const WithHoverComponent = props => {
    const [hover, setHover] = useState(false);
    const [zIndex, setZIndex] = useState(0);
    return (
      <Container zIndex={zIndex} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <BaseComponent setZIndex={setZIndex} hover={hover} {...(props)} />
      </Container>
    );
  };
  return WithHoverComponent;
};

const Container = styled.div`
  position: relative;
  z-index: ${p => p.zIndex ?? 0};
`;
