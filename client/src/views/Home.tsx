import type { Component } from 'solid-js'
import { useRouter } from '@rturnq/solid-router'
import { startAttestation } from '@simplewebauthn/browser'
import axios from 'axios'

const Home: Component = () => {
  const API_URL: string = 'http://localhost:4300'

  const router = useRouter()

  const user = JSON.parse(localStorage.getItem('user'))

  const onLogout = () => {
    // removing the user and token from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // sending user to login
    router.replace('/login')
  }

  const onAddNewAuthenticator = async (): Promise<void> => {
    const token: string = localStorage.getItem('token')

    try {
      const attOptsRes = await axios.get(`${API_URL}/user/generate-attestation-options`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const attestationOptions = attOptsRes.data.data.attestationOptions

      const attestation = await startAttestation(attestationOptions)

      const verificationRes = await axios.post(`${API_URL}/verify-attestation`, {
        userId: user._id,
        attestation
      })

      if (verificationRes.data.data) alert('Successfully registered new authenticator!')
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message)
      } else {
        alert('There was an error')
      }
      console.log(err)
    }
  }

  return (
    <main
      style={{ width: '100vw' }}
      class="d-flex flex-column justify-center align-items-center p-5 mb-4 bg-light rounded-3"
    >
      <div class="container-fluid py-5">
        <h1 class="display-4 fw-bold mb-4">Home</h1>
        <h5 class="display-6">Welcome back, {user ? user.name : '{name}'}</h5>

        <div class="my-5"></div>

        <button class="btn btn-info text-white" onClick={onAddNewAuthenticator}>
          Add another authenticator
        </button>
        <br />
        <br />
        <button onClick={onLogout} class="btn btn-warning text-white btn-lg">
          Logout
        </button>
      </div>
    </main>
  )
}

export default Home
