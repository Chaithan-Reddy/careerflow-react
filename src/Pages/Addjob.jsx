import { useState, useEffect } from "react"

function Addjob({ fetchJobs, editJob, closeModal }) {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("")
  const [interview, setInterview] = useState("No")

  // 🔁 Prefill when editing
  useEffect(() => {
    if (editJob) {
      setCompany(editJob.company)
      setRole(editJob.role)
      setStatus(editJob.status)
      setInterview(editJob.interview)
    } else {
      // reset when switching to Add mode
      setCompany("")
      setRole("")
      setStatus("")
      setInterview("No")
    }
  }, [editJob])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (!storedUser) return

    if (!company || !role || !status) {
      alert("All fields required")
      return
    }

    try {
      if (editJob) {
        // ✏ EDIT MODE
        await fetch(`https://localhost:5004/jobs/${editJob.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company,
            role,
            status,
            interview
          })
        })
      } else {
        // ➕ ADD MODE
        await fetch("https://localhost:5004/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company,
            role,
            status,
            interview,
            date: new Date().toLocaleString(),
            userId: storedUser.id
          })
        })
      }

      fetchJobs()
      closeModal()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: "20px" }}>
        {editJob ? "Edit Job" : "Add New Job"}
      </h2>

      <label>Company</label>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <label>Role</label>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="" disabled>Select Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>

      <label>Interview Attended?</label>
      <select
        value={interview}
        onChange={(e) => setInterview(e.target.value)}
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      <button type="submit">
        {editJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  )
}

export default Addjob