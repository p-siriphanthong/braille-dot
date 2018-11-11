import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { Close } from 'styled-icons/material'
import HelperBox from './helper-box'

const FadeIn = keyframes`
  from {
    top: -50px;
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
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
  z-index: 999;
`

const Modal = styled.div`
  color: ${props => props.theme.background};
  background: white;
  position: relative;
  width: 90%;
  max-width: 768px;
  padding: 50px;
  box-shadow: 0 0 20px black;
  position: relative;
  animation: ${FadeIn} 0.3s ease-in-out;
`

const BrailleList = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 120px);
  grid-template-columns: repeat(13, 1fr);

  @media (max-width: 768px) {
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(9, 1fr);
  }

  @media (max-width: 450px) {
    grid-template-rows: repeat(5, 80px);
    grid-template-columns: repeat(8, 1fr);
  }
`

const Title = styled.h1`
  text-align: center;
  font-size: 1.5em;
  margin-top: 0;
`

const CloseButton = styled(Close).attrs({
  size: 30,
  title: 'Close'
})`
  color: ${props => props.theme.background};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary};
  }
`

class Helper extends Component {
  render() {
    return (
      <Wrapper onClick={e => this.props.setHelpState(false)}>
        <Modal onClick={e => e.stopPropagation()}>
          <CloseButton onClick={e => this.props.setHelpState(false)} />
          <Title>The Braille Alpahbet and Numbers</Title>
          <BrailleList>
            {this.props.braille_list.map((braille, index) => (
              <HelperBox
                key={index}
                ch={braille.character}
                braille={braille.braille}
              />
            ))}
          </BrailleList>
        </Modal>
      </Wrapper>
    )
  }
}

export default Helper
