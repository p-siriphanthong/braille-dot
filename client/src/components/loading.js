import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`

const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const Dot = styled.div`
  background: ${props => props.theme.primary};
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin: 0 5px;
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`

class LoadingDots extends Component {
  render() {
    return (
      <Wrapper>
        <DotWrapper>
          <Dot delay={'0s'} />
          <Dot delay={'.1s'} />
          <Dot delay={'.2s'} />
        </DotWrapper>
      </Wrapper>
    )
  }
}

export default LoadingDots
