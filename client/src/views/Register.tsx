import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { startAttestation } from '@simplewebauthn/browser'
import axios from 'axios'

const Register: Component = () => {
  const [userDetails, setUserDetails] = createSignal({
    name: '',
    email: ''
  })

  const API_URL = 'http://localhost:4300'

  const onRegister = async (e: any): Promise<void> => {
    e.preventDefault()

    const { name, email } = userDetails()

    try {
      const attOptsRes = await axios.post(`${API_URL}/generate-attestation-options`, {
        name,
        email
      })

      const attestationOptions = attOptsRes.data.data.attestationOptions
      const userId = attOptsRes.data.data.userId

      const attestation = await startAttestation(attestationOptions)

      const verificationRes = await axios.post(`${API_URL}/verify-attestation`, {
        userId,
        attestation
      })

      if (verificationRes.data.data) alert('Successfully registered!')
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
      style={{ height: '100vh', width: '100vw' }}
      class="d-flex justify-center align-items-center p-5 mb-4 bg-light rounded-3"
    >
      <div class="container-fluid">
        <h1 class="display-5 fw-bold mb-4">Register</h1>
        <form onSubmit={onRegister}>
          <input
            type="name"
            value={userDetails().name}
            onChange={(e: any) =>
              setUserDetails((prev) => ({ ...prev, name: e.target.value }))
            }
            class="form-control"
            placeholder="Enter your name"
          />
          <div class="mt-3"></div>
          <input
            type="email"
            value={userDetails().email}
            onChange={(e: any) =>
              setUserDetails((prev) => ({ ...prev, email: e.target.value }))
            }
            class="form-control"
            placeholder="Enter your email"
          />
          <button type="submit" class="mt-3 btn btn-primary btn-md">
            REGISTER
          </button>
        </form>
      </div>
    </main>
  )
}

export default Register
