import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FiHome, FiBriefcase, FiUser, FiLogOut } from "react-icons/fi"

function Layout() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true })
    }
  }, [user, navigate])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/", { replace: true })
  }

  if (!user) return null

  return (
    <div className="app-layout">

      <aside className="sidebar">

        <div className="sidebar-top">
          <h2 className="logo">⚡ CareerFlow</h2>

          <nav className="nav-links">

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FiHome /> <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/my-jobs"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FiBriefcase /> <span>My Jobs</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FiUser /> <span>Profile</span>
            </NavLink>

          </nav>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-logout" onClick={handleLogout}>
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>

      </aside>

      <div className="main-area">

        <div className="topbar">

          <div className="topbar-right">
            <div
              className="avatar-section"
              onClick={() => setOpen(!open)}
            >
              <div className="avatar-icon">
                <FiUser />
              </div>
              <span className="username">
                {user?.username}
              </span>
            </div>
          </div>

          {open && (
            <div className="dropdown">
              <button onClick={() => navigate("/profile")}>
                Profile
              </button>
              <button onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

        </div>

        <Outlet />

      </div>
    </div>
  )
}

export default Layout