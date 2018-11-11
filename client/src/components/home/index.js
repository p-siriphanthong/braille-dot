import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Refresh, Help } from 'styled-icons/material'

import BrailleBox from './braille-box'
import LoadingDots from '../loading'
import Helper from './helper'

const Wrapper = styled.div`
  text-align: center;
  margin-top: 100px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`

const Question = styled.h1`
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-top: 80px;
    font-size: 1.5em;
  }
`

const Excellent = styled.p`
  color: ${props => props.theme.primary};
  font-size: 1.2em;
  letter-spacing: 2px;
  ${props => props.show && `opacity: 1.0`}
  ${props =>
    !props.show && `opacity: 0.0`}
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
  right: 100px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary};
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 50px;
  }
`

const HelpButton = styled(Help).attrs({
  size: 30,
  title: 'Help'
})`
  color: white;
  position: absolute;
  top: 50px;
  right: 50px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary};
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      loading: true,
      help: false,
      word: '',
      brailles: [],
      corrects: [],
      count: 0,
      braille_list: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    axios
      .get('/api/braille/list')
      .then(res => {
        this.setState({ braille_list: res.data }, this.getBrailleWord())
      })
      .catch(error => {
        console.log(error)
      })
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
          brailles,
          corrects: Array(brailles.length).fill(false),
          count: this.state.count + 1
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  setCorrectsState = (index, value) => {
    const corrects = this.state.corrects
    corrects[index] = value
    this.setState({ corrects })
  }

  setHelpState = bool => {
    this.setState({ help: bool })
  }

  render() {
    if (!this.state.render) return <LoadingDots />
    else {
      return (
        <React.Fragment>
          {this.state.loading ? <LoadingDots /> : ''}
          {this.state.help ? (
            <Helper
              braille_list={this.state.braille_list}
              setHelpState={this.setHelpState}
            />
          ) : (
            ''
          )}
          <Wrapper>
            <Question>
              What is Braille of <Word>'{this.state.word}'</Word> ?
            </Question>
            <Excellent
              show={this.state.corrects.every(correct => correct === true)}
            >
              Excellent!
            </Excellent>
            <BrailleBoxes>
              {this.state.brailles.map((braille, index) => (
                <BrailleBox
                  key={String(this.state.count) + '-' + String(index)}
                  ch={this.state.word.split('')[index]}
                  braille={braille}
                  index={index}
                  correct={this.state.corrects[index]}
                  setCorrectsState={this.setCorrectsState}
                />
              ))}
            </BrailleBoxes>
            <RefreshButton onClick={e => this.getBrailleWord()} />
            <HelpButton onClick={e => this.setHelpState(true)} />
          </Wrapper>
        </React.Fragment>
      )
    }
  }
}

export default Home
