import { Routes, Route } from "react-router-dom"
import AuthPage from "./AuthPage"
import Layout from "./Layout"
import DashboardPage from "./DashboardPage"
import MyJobsPage from "./MyJobsPage"
import ProfilePage from "./ProfilePage"

function App() {
  return (
    <Routes>

      {/* Authentication Page */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected Layout */}
      <Route element={<Layout />}>

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-jobs" element={<MyJobsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Route>

    </Routes>
  )
}

export default App