import React from 'react'
import { Switch, Route } from 'react-router-dom'
import WaveClocks from './scenes/WaveClocks'
import Mountains from './scenes/Mountains'
import FlowField from './scenes/FlowField'

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={WaveClocks} />
      <Route path="/mountains" component={Mountains} />
      <Route path="/flow-field" component={FlowField} />
    </Switch>
  )
}

export default App
