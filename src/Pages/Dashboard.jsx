import React from 'react'

function Dashboard({jobs}) {
  let total= jobs.length
  let interviews = jobs.filter((job) => job.status === 'Interview').length
  let offers = jobs.filter((job) => job.status === 'Offer').length
  let rejections = jobs.filter((job) => job.status === 'Rejected').length
  let pending = jobs.filter((job) => job.status === 'Applied').length
  let interviewExp = jobs.filter((job) => job.interview == 'Yes').length

  const interviewRate = total === 0?0:((interviewExp/total)*100).toFixed(1)
 
  return (
    <>
      <h1>Total Applicants: {total}</h1>
      <h1>Pending: {pending}</h1>
      <h1>Interviews: {interviews}</h1>
      <h1>Offers Received: {offers}</h1>
      <h1>Rejections: {rejections}</h1>
      <h1>Interview %: {interviewRate}</h1>
    </>
  );
}

export default Dashboard