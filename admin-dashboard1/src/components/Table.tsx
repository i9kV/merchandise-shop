import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export interface Column<T> {
  key: keyof T;
  title: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

function Table<T extends { id: number }>({ data, columns, onEdit, onDelete }: TableProps<T>) {
  return (
    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700">
          {columns.map((col) => (
            <th
              key={col.key as string}
              className="px-4 py-2 text-left text-gray-800 dark:text-gray-100"
            >
              {col.title}
            </th>
          ))}
          {(onEdit || onDelete) && (
            <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-100">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700">
            {columns.map((col) => (
              <td key={col.key as string} className="px-4 py-2">
                {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
              </td>
            ))}
            {(onEdit || onDelete) && (
              <td className="px-4 py-2 flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition"
                  >
                    <FaEdit className="h-4 w-4" /> Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition"
                  >
                    <FaTrash className="h-4 w-4" /> Delete
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
