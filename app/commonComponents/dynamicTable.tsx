import React, { useState } from "react";
import FallBackUi from "./fallBackUi";

type DynamicTableProps = {
  title?: string;
  columns: string[];
  data: any[];
  onRowAction?: (row: any) => void;
  actionLabel?: string;
  handleRouters?: () => void;
  routerButtonName?: string;

  // ✅ FIX: accept multiple rows
  handleDeleteSelected?: (rows: any[]) => void;
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  title = "",
  columns = [],
  data = [],
  onRowAction,
  actionLabel = "View",
  handleRouters,
  routerButtonName,
  handleDeleteSelected,
}) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  // ✅ Select / Unselect single row
  const handleSelectRow = (row: any) => {
    const exists = selectedRows.find((r) => r.id === row.id);

    if (exists) {
      setSelectedRows(selectedRows.filter((r) => r.id !== row.id));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  // ✅ Select All
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data);
    }
  };

  const getSelectedFields = (row: any) => {
    return columns.reduce((acc: any, col: string) => {
      acc[col] = row[col];
      return acc;
    }, {});
  };

  const handleDelete = () => {
    handleDeleteSelected?.(selectedRows)
    setSelectedRows([])

  }

  return (
    <div className="flex flex-col gap-5 pt-4 rounded-[20px] bg-white shadow p-4 mt-6">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-blue-300 rounded-[20px]">
        <h2 className="text-[20px] font-bold">{title}</h2>

        <div className="flex gap-3">
          {selectedRows.length > 0 && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded-[10px] hover:bg-red-600"
            >
              Delete ({selectedRows.length})
            </button>
          )}

          {handleRouters && (
            <button
              onClick={handleRouters}
              className="bg-orange-200 py-1 px-3 rounded-[10px]"
            >
              {routerButtonName}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border rounded-lg">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full table-auto border-collapse">

            {/* Head */}
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="border p-2 text-center w-[50px]">
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 &&
                      selectedRows.length === data.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>

                <th className="border p-2 w-[60px] text-center">NO</th>

                {columns.map((col) => (
                  <th key={col} className="border p-2 min-w-[150px] text-left">
                    {col.toUpperCase()}
                  </th>
                ))}

                {onRowAction && (
                  <th className="border p-2 text-center w-[120px]">
                    {actionLabel.toUpperCase()}
                  </th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-gray-50">

                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.some((r) => r.id === row.id)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </td>

                  <td className="border p-2 text-center">
                    {index + 1}
                  </td>

                  {columns.map((col) => (
                    <td
                      key={col}
                      className="border p-2 max-w-[200px] truncate"
                      title={row[col]}
                    >
                      {row[col] ?? "-"}
                    </td>
                  ))}

                  {onRowAction && (
                    <td className="border p-2 text-center">
                      <button
                        className="bg-gray-300 px-4 py-1 rounded-[10px] hover:bg-gray-400"
                        onClick={() =>
                          onRowAction({
                            id: row.id,
                            ...getSelectedFields(row),
                          })
                        }
                      >
                        {actionLabel}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {data.length === 0 && <FallBackUi />}
    </div>
  );
};

export default DynamicTable;