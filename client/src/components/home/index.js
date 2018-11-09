import React, { Component } from 'react'
import styled from 'styled-components'

import BrailleBox from './braille-box'

const Wrapper = styled.div`
  margin-top: 100px;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`

const Question = styled.h1`
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`

const Word = styled.span`
  color: ${props => props.theme.word};
`

const BrailleBoxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { render: false, word: '', brailles: [] }
  }

  setStateAsync = state => {
    return new Promise(resolve => {
      this.setState(state, resolve)
    })
  }

  async componentDidMount() {
    const res = await fetch('/api/braille/word/random')
    const { word, brailles } = await res.json()
    await this.setStateAsync({ render: true, word, brailles })
    console.log(brailles)
  }

  render() {
    if (this.state.render) {
      return (
        <Wrapper>
          <Question>
            What is Braille of <Word>'{this.state.word}'</Word> ?
          </Question>
          <BrailleBoxes>
            {this.state.brailles.map((braille, index) => (
              <BrailleBox
                key={index}
                ch={this.state.word.split('')[index]}
                braille={braille}
                colorIndex={index}
              />
            ))}
          </BrailleBoxes>
        </Wrapper>
      )
    } else return null
  }
}

export default Home
