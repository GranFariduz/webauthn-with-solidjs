import type { Component } from 'solid-js'
import { useRouter } from '@rturnq/solid-router'

const Home: Component = () => {
  const router = useRouter()

  const user = JSON.parse(localStorage.getItem('user'))

  const onLogout = () => {
    // removing the user and token from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // sending user to login
    router.replace('/login')
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

        <button onClick={onLogout} class="btn btn-info text-white btn-lg">
          Logout
        </button>
      </div>
    </main>
  )
}

export default Home
