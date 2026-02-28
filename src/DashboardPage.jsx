import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts"

function DashboardPage() {
  const [jobs, setJobs] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))

    if (!storedUser) {
      navigate("/")
      return
    }

    setUser(storedUser)

    const fetchJobs = async () => {
      const res = await fetch(
        `http://localhost:5004/jobs?userId=${storedUser.id}`
      )
      const data = await res.json()
      setJobs(data)
    }

    fetchJobs()
  }, [navigate])

  if (!user) return null

  // ===== Stats =====
  const total = jobs.length
  const pending = jobs.filter(j => j.status === "Applied").length
  const interview = jobs.filter(j => j.status === "Interview").length
  const rejected = jobs.filter(j => j.status === "Rejected").length
  const offer = jobs.filter(j => j.status === "Offer").length

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Interview", value: interview },
    { name: "Rejected", value: rejected },
    { name: "Offer", value: offer }
  ]

  const COLORS = ["#facc15", "#3b82f6", "#ef4444", "#22c55e"]

  return (
    <div className="dashboard">

      <div className="main">

        <div className="header">
          <h1>Dashboard</h1>
          <span>Welcome {user.username}</span>
        </div>

        <div className="stats-grid">
          <div className="card">Total<br />{total}</div>
          <div className="card yellow">Pending<br />{pending}</div>
          <div className="card blue">Interview<br />{interview}</div>
          <div className="card red">Rejected<br />{rejected}</div>
          <div className="card green">Offer<br />{offer}</div>
        </div>

        <div className="analytics-section">

          <div className="chart-box">
            <h2>Application Status</h2>

            <div className="chart-wrapper">

              <ResponsiveContainer width="60%" height={260}>
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="custom-legend">
                {chartData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span
                      className="legend-dot"
                      style={{ backgroundColor: COLORS[index] }}
                    ></span>
                    <span className="legend-text">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className="latest-jobs">
            {jobs
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((job) => (
                <div className="job-card" key={job.id}>
                  <div>
                    <h3>{job.company} - {job.role}</h3>
                    <span className="job-date">{job.date}</span>
                  </div>

                  <span className={`badge ${job.status}`}>
                    {job.status}
                  </span>
                </div>
              ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default DashboardPage