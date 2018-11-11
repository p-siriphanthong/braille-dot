import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
`

const Character = styled.p`
  font-size: 1.1em;
  margin-bottom: 10px;
  text-align: center;
`

const Box = styled.div`
  border: 2px solid ${props => props.theme.background};
  width: 40px;
  height: 60px;
  margin: auto;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    width: 30px;
    height: 45px;
  }

  @media (max-width: 450px) {
    border-width: 1px;
  }
`

const Button = styled.div`
  ${props =>
    props.value === '0' &&
    `border: 2px solid ${props.theme.background};`}
  ${props =>
    props.value === '1' &&
    `background: ${props.theme.background};`}
  border-radius: 50%;
  margin: 5px;

  @media (max-width: 768px) {
    margin: 3px;
  }
`

class HelperBox extends Component {
  render() {
    return (
      <Wrapper>
        <Character>{this.props.ch}</Character>
        <Box>
          {this.props.braille.split('').map((code, index) => (
            <Button key={index} value={code} />
          ))}
        </Box>
      </Wrapper>
    )
  }
}

export default HelperBox
