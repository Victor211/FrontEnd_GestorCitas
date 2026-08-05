import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";

interface LoadingTableProps {
  rows?: number;
  columns: number;
}

export function LoadingTable({ rows = 5, columns }: LoadingTableProps) {
  return (
    <Table aria-hidden="true">
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((__, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
