import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Refresh } from 'styled-icons/material'

import LoadingDots from '../loading'
import BrailleBox from './braille-box'

const Wrapper = styled.div`
  margin-top: 100px;

  @media (max-width: 768px) {
    margin-top: 50px;
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
  color: ${props => props.theme.primary};
`

const BrailleBoxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const RefreshButton = styled(Refresh).attrs({
  size: 30,
  title: 'Refresh'
})`
  color: white;
  position: absolute;
  top: 50px;
  right: 50px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary};
  }
`

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      loading: true,
      word: '',
      brailles: []
    }
  }

  getBrailleWord = () => {
    this.setState({ loading: true })
    axios
      .get('/api/braille/word/random')
      .then(res => {
        const { word, brailles } = res.data
        this.setState({
          render: true,
          loading: false,
          word,
          brailles
        })
        console.log(word, brailles)
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.getBrailleWord()
  }

  render() {
    if (!this.state.render) return <LoadingDots />
    else {
      return (
        <React.Fragment>
          {this.state.loading ? <LoadingDots /> : ''}
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
            <RefreshButton onClick={e => this.getBrailleWord()} />
          </Wrapper>
        </React.Fragment>
      )
    }
  }
}

export default Home
