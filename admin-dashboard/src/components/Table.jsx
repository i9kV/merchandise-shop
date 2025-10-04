const Table = ({ data, columns, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100 font-semibold"
              >
                {col.title}
              </th>
            ))}
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-800 dark:text-gray-100 font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map(row => (
              <tr
                key={row.id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-200"
                  >
                    {row[col.key]}
                  </td>
                ))}
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(row)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-gray-500 dark:text-gray-400"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
