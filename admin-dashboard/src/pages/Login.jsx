import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === '1234') {
      navigate('/dashboard')
    } else {
      alert('Incorrect username or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
