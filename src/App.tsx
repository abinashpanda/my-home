import React from 'react'
import { Switch, Route } from 'react-router-dom'
import WaveClocks from './scenes/WaveClocks'

const App = () => {
  return (
    <Switch>
      <Route path="/" component={WaveClocks} />
    </Switch>
  )
}

export default App
