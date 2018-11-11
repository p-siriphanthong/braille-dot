import React, { Component } from 'react'
import styled from 'styled-components'

const Character = styled.p.attrs({
  colors: props =>
    props.correct
      ? props.theme.correctColor[props.index]
      : props.theme.defaultColor
})`
  color: ${props => props.colors.click};
  font-size: 1.3em;
  text-align: center;
  transition: all 0.2s linear;
`

const Box = styled.div.attrs({
  colors: props =>
    props.correct
      ? props.theme.correctColor[props.index]
      : props.theme.defaultColor
})`
  border: 2px solid ${props => props.colors.default};
  ${props => props.correct && `box-shadow: 0 0 20px ${props.colors.default}`};
  width: 200px;
  height: 300px;
  margin: 20px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  transition: all 0.2s linear;
`

const Button = styled.div.attrs({
  colors: props =>
    props.correct
      ? props.theme.correctColor[props.index]
      : props.theme.defaultColor
})`
  ${props =>
    props.value === '0' &&
    `border: 2px solid ${props.colors.default};`}
  ${props =>
    props.value === '1' &&
    `background: ${props.colors.click};`}
  border-radius: 50%;
  margin: 20px;
  transition: all 0.2s linear;
  cursor: pointer;

  &:hover {
    background: ${props => props.colors.default};
  }
`

class BrailleBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      braille: '000000'
    }
  }

  toggleBraille = index => {
    let newCode = this.state.braille[index] === '1' ? '0' : '1'
    let newBraille =
      this.state.braille.substring(0, index) +
      newCode +
      this.state.braille.substring(index + 1)
    this.setState({ braille: newBraille }, () => {
      if (this.props.braille === this.state.braille)
        this.props.setCorrectsState(this.props.index, true)
      else this.props.setCorrectsState(this.props.index, false)
    })
  }

  render() {
    return (
      <div>
        <Character correct={this.props.correct} index={this.props.index}>
          {this.props.ch}
        </Character>
        <Box correct={this.props.correct} index={this.props.index}>
          {this.state.braille.split('').map((code, index) => (
            <Button
              key={index}
              value={code}
              correct={this.props.correct}
              index={this.props.index}
              setCorrectsState={this.props.setCorrectsState}
              onClick={e => this.toggleBraille(index)}
            />
          ))}
        </Box>
      </div>
    )
  }
}

export default BrailleBox
