import { useState, useMemo } from 'react'

const Table = ({ data, columns, onEdit, onDelete }) => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const itemsPerPage = 5

  // Sort handler
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  // Filtered & sorted data
  const filteredData = useMemo(() => {
    let filtered = data.filter(row =>
      columns.some(col =>
        String(row[col.key]).toLowerCase().includes(search.toLowerCase())
      )
    )
    if (sortKey) {
      filtered.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }
    return filtered
  }, [data, search, sortKey, sortOrder, columns])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      {/* Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="border p-2 text-left cursor-pointer dark:border-gray-600"
                onClick={() => handleSort(col.key)}
              >
                {col.title} {sortKey === col.key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
            <th className="border p-2 dark:border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map(col => (
                  <td key={col.key} className="border p-2 dark:border-gray-700 dark:text-white whitespace-nowrap">
                    {row[col.key]}
                  </td>
                ))}
                <td className="border p-2 flex gap-2 dark:border-gray-700">
                  <button
                    onClick={() => onEdit(row)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md shadow hover:bg-red-700 dark:hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center p-4 text-gray-500 dark:text-gray-300">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-wrap justify-end gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Table
