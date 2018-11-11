import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
`

const Character = styled.p.attrs({
  color: props =>
    props.highlight ? props.theme.primary : props.theme.background
})`
  color: ${props => props.color};
  font-size: 1.1em;
  text-align: center;
  margin-bottom: 10px;
`

const Box = styled.div.attrs({
  color: props =>
    props.highlight ? props.theme.primary : props.theme.background
})`
  border: 2px solid ${props => props.color};
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

const Button = styled.div.attrs({
  color: props =>
    props.highlight ? props.theme.primary : props.theme.background
})`
  ${props =>
    props.value === '0' && `border: 2px solid ${props.color};`}
  ${props =>
    props.value === '1' && `background: ${props.color};`}
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
        <Character highlight={this.props.highlight}>{this.props.ch}</Character>
        <Box highlight={this.props.highlight}>
          {this.props.braille.split('').map((code, index) => (
            <Button key={index} value={code} highlight={this.props.highlight} />
          ))}
        </Box>
      </Wrapper>
    )
  }
}

export default HelperBox
