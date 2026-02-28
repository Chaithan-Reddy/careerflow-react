function JobList({ jobs, handleDelete, handleEdit }) {

  if (jobs.length === 0) {
    return <h3>No jobs found</h3>
  }

  return (
    <div className="job-table-container">
      <table className="job-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Interview</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id}>
              <td>{index + 1}</td>
              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>
                <span className={`badge ${job.status}`}>
                  {job.status}
                </span>
              </td>
              <td>{job.interview}</td>
              <td>{job.date}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobList