import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { Link, useRouter } from '@rturnq/solid-router'
import { startAssertion } from '@simplewebauthn/browser'
import axios from 'axios'

const Login: Component = () => {
  const router = useRouter()

  const [email, setEmail] = createSignal('')

  const API_URL = 'http://localhost:4300'

  const onLogin = async (e: any) => {
    e.preventDefault()

    try {
      const assertionOptsRes = await axios.post(`${API_URL}/generate-assertion-options`, {
        email: email()
      })

      const assertion = await startAssertion({
        ...assertionOptsRes.data.data.assertionOptions
      })
      const userId = assertionOptsRes.data.data.userId

      const verificationRes = await axios.post(`${API_URL}/verify-assertion`, {
        userId,
        assertion
      })

      if (verificationRes.data.success) {
        alert('You are successfully logged in!')

        const token = verificationRes.data.data.token
        const user = verificationRes.data.data.user

        // saving user and token in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        // sending the user to homepage
        router.replace('/')
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message)
      } else {
        alert('Verification did not succeed')
      }
      console.log(err)
    }
  }

  return (
    <main
      style={{ height: '100vh', width: '100vw' }}
      class="d-flex flex-column justify-center align-items-center p-5 mb-4 bg-light rounded-3"
    >
      <Link href="/register">Register</Link>
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold mb-4">Login</h1>
        <form onSubmit={onLogin} class="mb-4">
          <input
            value={email()}
            onChange={(e: any) => setEmail(e.target.value)}
            type="email"
            class="form-control"
            placeholder="Enter your email"
          />
          <button class="mt-3 btn btn-primary btn-md" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login
