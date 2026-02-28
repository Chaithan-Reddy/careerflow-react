import { useState } from "react"
import Login from './Pages/Login'
import Register from "./Pages/Register"

function AuthPage() {
  const [active, setActive] = useState("login")

  return (
    <div className="landing-wrapper">

      {/* Top Navbar */}
      <div className="landing-navbar">
        <div className="landing-logo">
          CareerFlow
        </div>

        <div className="landing-nav-buttons">
          <button
            className={active === "login" ? "active" : ""}
            onClick={() => setActive("login")}
          >
            Login
          </button>

          <button
            className={active === "register" ? "active" : ""}
            onClick={() => setActive("register")}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="landing-hero">

        <div className="hero-left">
          <h1>
            Smart Job Application <br />
            Tracking Made Easy
          </h1>

          <p>
            Track your job applications, monitor progress,
            and stay organized in one powerful dashboard.
          </p>

          <button
            className="hero-cta"
            onClick={() => setActive("register")}
          >
            Get Started
          </button>
        </div>

        <div className="hero-right">
          <div className="form-card">
            {active === "login" 
              ? <Login /> 
              : <Register switchToLogin={() => setActive("login")} />
            }
          </div>
        </div>

      </div>

      {/* Features */}
      <div className="landing-features">

        <div className="feature-box">
          <div className="feature-icon yellow"></div>
          <h3>Organize Applications</h3>
          <p>Manage all your job applications in one place.</p>
        </div>

        <div className="feature-box">
          <div className="feature-icon blue"></div>
          <h3>Track Progress</h3>
          <p>Visualize interview and offer rates clearly.</p>
        </div>

        <div className="feature-box">
          <div className="feature-icon green"></div>
          <h3>Gain Insights</h3>
          <p>Understand your success patterns.</p>
        </div>

      </div>

    </div>
  )
}

export default AuthPage