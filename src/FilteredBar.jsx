function FilteredBar({ filterStatus, setFilterStatus }) {

  const buttons = ["All", "Pending", "Interview", "Rejected", "Offer"]

  return (
    <>
      {buttons.map((btn) => (
        <button
          key={btn}
          className={`filter-btn ${
            filterStatus === btn ? "active" : ""
          } ${btn}`}
          onClick={() => setFilterStatus(btn)}
        >
          {btn}
        </button>
      ))}
    </>
  )
}

export default FilteredBar