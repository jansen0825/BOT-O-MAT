import React, { useState } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';

const useStyles = makeStyles({
  tableCell: {
    maxWidth: 250,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const getValue = (path, object) =>
  path.split('.').reduce((prev, nestedProperty) => {
    return prev ? prev[nestedProperty] : null;
  }, object || {});

const COLUMNS = [
  { id: 'name', label: 'Name', minWidth: 140 },
  { id: 'type.name', label: 'Type', minWidth: 100 },
  {
    id: 'totalTasks',
    label: 'Total Tasks',
    minWidth: 80,
    align: 'right',
  },
];

const LeaderBoard = ({ robots }) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {COLUMNS.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {robots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {COLUMNS.map(column => (
                  <TableCell key={column.id} align={column.align} className={classes.tableCell}>
                    {getValue(column.id, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 7]}
        component="div"
        count={robots.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default LeaderBoard;
