import React from 'react'
import 'typeface-roboto'
import { Container } from '@material-ui/core'
import NavBar from './NavBar'
import Expo from './Expo'

function App(props) {
  return (
    <Container maxWidth="sm" style={{ padding: 0 }}>
      <NavBar />
      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center'
        }}
      >
        <Expo />
      </Container>
    </Container>
  )
}

export default App
