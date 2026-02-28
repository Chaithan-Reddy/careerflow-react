function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      value={searchTerm}
      placeholder="Search"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}
export default SearchBar