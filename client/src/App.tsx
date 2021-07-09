import type { Component } from 'solid-js'
import { Switch, onMount } from 'solid-js'
import { MatchRoute, useRouter } from '@rturnq/solid-router'
import { supportsWebauthn } from '@simplewebauthn/browser'

// views
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'

const App: Component = () => {
  const router = useRouter()

  onMount(() => {
    if (!supportsWebauthn()) {
      alert('Sorry, does not look like your browser supports WebAuthentication')
    }

    const isTokenPresent: boolean = !!localStorage.getItem('token')

    if (!isTokenPresent) router.replace('/login')
    else router.replace('/')
  })

  return (
    <Switch>
      <MatchRoute end>
        <Home />
      </MatchRoute>
      <MatchRoute path="/login">
        <Login />
      </MatchRoute>
      <MatchRoute path="/register">
        <Register />
      </MatchRoute>
    </Switch>
  )
}

export default App
