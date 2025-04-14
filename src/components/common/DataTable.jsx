"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const DataTable = ({ columns, data, onRowClick, emptyMessage = "No data available", className }) => {
  if (!data || data.length === 0) {
    return <div className="flex justify-center items-center p-8 text-muted-foreground">{emptyMessage}</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={row.id || rowIndex}
              className={onRowClick ? "cursor-pointer" : ""}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => (
                <TableCell key={`${row.id || rowIndex}-${column.key}`} className={column.cellClassName}>
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
