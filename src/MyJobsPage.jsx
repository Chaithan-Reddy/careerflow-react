import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Addjob from "./Pages/Addjob"
import JobList from "./Pages/JobList"
import FilteredBar from "./FilteredBar"
import SearchBar from "./SearchBar"
import { FiDownload } from "react-icons/fi"

function MyJobsPage() {
  const [jobs, setJobs] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editJob, setEditJob] = useState(null)

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!user) {
      navigate("/")
      return
    }

    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    if (!user) return

    const res = await fetch(
      `http://localhost:5004/jobs?userId=${user.id}`
    )
    const data = await res.json()
    setJobs(data)
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5004/jobs/${id}`, {
      method: "DELETE"
    })
    fetchJobs()
  }

  const handleEdit = (job) => {
    setEditJob(job)
    setShowForm(true)
  }

  const handleExport = () => {
    if (filteredJobs.length === 0) return

    const headers = ["Company", "Role", "Status", "Interview", "Date"]

    const rows = filteredJobs.map((job) =>
      [job.company, job.role, job.status, job.interview, job.date].join(",")
    )

    const csvContent = [headers.join(","), ...rows].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "my_jobs.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const filteredJobs = jobs
    .filter((job) => {
      if (filterStatus === "All") return true
      if (filterStatus === "Pending") return job.status === "Applied"
      return job.status === filterStatus
    })
    .filter((job) =>
      job.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

  if (!user) return null

  return (
    <div>

      <div className="myjobs-header">
        <h1>My Jobs</h1>

        <div className="header-actions">
          <button className="export-btn" onClick={handleExport}>
            <FiDownload />
            Export CSV
          </button>

          <button
            className="add-btn"
            onClick={() => {
              setEditJob(null)
              setShowForm(true)
            }}
          >
            + Add Job
          </button>
        </div>
      </div>

      <div className="controls-row">
        <div className="filter-group">
          <FilteredBar
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>

        <div className="right-controls">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>

      <JobList
        jobs={filteredJobs}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <Addjob
              fetchJobs={fetchJobs}
              editJob={editJob}
              closeModal={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default MyJobsPage