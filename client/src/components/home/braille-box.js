import React, { Component } from 'react'
import styled from 'styled-components'

const Character = styled.p.attrs({
  colors: props =>
    props.correct
      ? props.theme.correctColor[props.colorIndex]
      : props.theme.defaultColor
})`
  color: ${props => props.colors.click};
  font-size: 1.3em;
  text-align: center;
`

const Box = styled.div.attrs({
  colors: props =>
    props.correct
      ? props.theme.correctColor[props.colorIndex]
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
`

const Button = styled.div.attrs({
  colors: props =>
    props.correct
      ? props.theme.correctColor[props.colorIndex]
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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${props => props.colors.default};
  }
`

class BrailleBox extends Component {
  constructor(props) {
    super(props)
    this.state = { braille: '000000', correct: false }
  }

  toggleBraille = index => {
    let newCode = this.state.braille[index] === '1' ? '0' : '1'
    let newBraille =
      this.state.braille.substring(0, index) +
      newCode +
      this.state.braille.substring(index + 1)
    this.setState({ braille: newBraille }, () => {
      if (this.props.braille === this.state.braille)
        this.setState({ correct: true })
      else this.setState({ correct: false })
    })
  }

  render() {
    return (
      <div>
        <Character
          correct={this.state.correct}
          colorIndex={this.props.colorIndex}
        >
          {this.props.ch}
        </Character>
        <Box correct={this.state.correct} colorIndex={this.props.colorIndex}>
          {this.state.braille.split('').map((code, index) => (
            <Button
              key={index}
              value={code}
              correct={this.state.correct}
              colorIndex={this.props.colorIndex}
              onClick={e => this.toggleBraille(index)}
            />
          ))}
        </Box>
      </div>
    )
  }
}

export default BrailleBox
