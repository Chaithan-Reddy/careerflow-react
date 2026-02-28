import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(
        `http://careerflow-9mqb.onrender.com/users?email=${email}`
      )

      const data = await res.json()

      if (data.length === 0) {
        alert("User not found")
        return
      }

      const user = data[0]

      if (user.password !== password) {
        alert("Invalid password")
        return
      }

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(user))

      // Go to dashboard
      navigate("/dashboard")

    } catch (error) {
      console.log(error)
      alert("Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  )
}

export default Login