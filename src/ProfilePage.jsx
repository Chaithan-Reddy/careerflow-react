import { FiUser, FiLogOut } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

function ProfilePage() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/", { replace: true })
  }

  if (!user) return null

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-avatar">
          <FiUser size={40} />
        </div>

        <h2>{user.username}</h2>
        <p>{user.email}</p>

        <button className="profile-logout" onClick={handleLogout}>
          <FiLogOut style={{ marginRight: "8px" }} />
          Logout
        </button>

      </div>
    </div>
  )
}

export default ProfilePage