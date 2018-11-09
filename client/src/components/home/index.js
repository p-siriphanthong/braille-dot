import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
  componentDidMount() {
    axios
      .get('/api/braille/word/random')
      .then(res => {
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Home page</h1>
      </React.Fragment>
    )
  }
}

export default Home
