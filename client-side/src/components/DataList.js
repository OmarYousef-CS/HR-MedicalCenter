import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

function DataList({ headData, bodyData }) {
  return (
    <Table>
      <TableHead sx={{ backgroundColor: '#D0D0D0' }}>
        <TableRow>
            {headData.map((head) => (
                <TableCell>{head}</TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {bodyData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
                {headData.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>{row[column]}</TableCell>
                ))}
            </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DataList
