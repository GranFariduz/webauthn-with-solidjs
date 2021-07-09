import { render } from 'solid-js/web'
import type { Component } from 'solid-js'
import { Router, pathIntegration } from '@rturnq/solid-router'

import './index.css'

import App from './App'

const Root: Component = () => (
  <Router integration={pathIntegration()}>
    <App />
  </Router>
)

render(() => <Root />, document.getElementById('root'))
