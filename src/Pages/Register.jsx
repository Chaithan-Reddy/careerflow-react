import {useState} from 'react'
import { Navigate } from 'react-router-dom'

function Register({ switchToLogin })  {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const handleSubmit = async(e) => {
  try {
    e.preventDefault()
    let userDetails = {username, email, password}
    let res = await fetch(`http://careerflow-9mqb.onrender.com/users?email=${email}`)
    let jsonRes = await res.json()
    if(jsonRes.length === 0){
      let postRes = await fetch("http://careerflow-9mqb.onrender.com/users",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(userDetails)
      })
    if(postRes.ok){
      switchToLogin()
      }else{
        console.log('failed')
      }
    }else{
      alert
      
      ('User exists already')
    }
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1>sign up</h1>
      <label>Username: </label><br />
      <input type="text"
             value={username}
             placeholder="Enter Your Username"
             onChange={(e) => setUsername(e.target.value)}
             /><br /> <br />
      <label>Email: </label><br />
      <input type="email"
             value={email} 
             placeholder="enter your Email ID" 
             onChange={(e) => setEmail(e.target.value)}/><br /> <br />
      <label>Password: </label><br />
      <input type="password"
             value={password}  
             placeholder="set a Password"
             onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register