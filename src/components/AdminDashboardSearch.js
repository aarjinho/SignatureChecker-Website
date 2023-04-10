import React from 'react'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';

import { visuallyHidden } from '@mui/utils';


function createData(name, calories, fat, carbs, protein) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }
  
  const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ];
  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Nom et prénom',
    },
    {
      id: 'promo',
      numeric: true,
      disablePadding: false,
      label: 'Promotion',
    },
    {
      id: 'statut',
      numeric: true,
      disablePadding: false,
      label: 'Statut',
    },
    {
      id: 'absences',
      numeric: true,
      disablePadding: false,
      label: "Nombre d'absences",
    }
  ];
  
  const DEFAULT_ORDER = 'asc';
  const DEFAULT_ORDER_BY = 'calories';
  const DEFAULT_ROWS_PER_PAGE = 5;
  
  function EnhancedTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort } =
      props;
    const createSortHandler = (newOrderBy) => (event) => {
      onRequestSort(event, newOrderBy);
    };
  
    return (
      <TableHead>
        <TableRow>

          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label }
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  export default function AdminDashboardSearch() {
    const [order, setOrder] = React.useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
    const [page, setPage] = React.useState(0);
    const [visibleRows, setVisibleRows] = React.useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [paddingHeight, setPaddingHeight] = React.useState(0);
  
    React.useEffect(() => {
      let rowsOnMount = stableSort(
        rows,
        getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
      );
  
      rowsOnMount = rowsOnMount.slice(
        0 * DEFAULT_ROWS_PER_PAGE,
        0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
      );
  
      setVisibleRows(rowsOnMount);
    }, []);
  
    const handleRequestSort = React.useCallback(
      (event, newOrderBy) => {
        const isAsc = orderBy === newOrderBy && order === 'asc';
        const toggledOrder = isAsc ? 'desc' : 'asc';
        setOrder(toggledOrder);
        setOrderBy(newOrderBy);
  
        const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
        const updatedRows = sortedRows.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        );
  
        setVisibleRows(updatedRows);
      },
      [order, orderBy, page, rowsPerPage],
    );
  
  

  
    const handleChangePage = React.useCallback(
      (event, newPage) => {
        setPage(newPage);
  
        const sortedRows = stableSort(rows, getComparator(order, orderBy));
        const updatedRows = sortedRows.slice(
          newPage * rowsPerPage,
          newPage * rowsPerPage + rowsPerPage,
        );
  
        setVisibleRows(updatedRows);
  
        // Avoid a layout jump when reaching the last page with empty rows.
        const numEmptyRows =
          newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;
  
      },
      [order, orderBy, rowsPerPage],
    );
  
    const handleChangeRowsPerPage = React.useCallback(
      (event) => {
        const updatedRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(updatedRowsPerPage);
  
        setPage(0);
  
        const sortedRows = stableSort(rows, getComparator(order, orderBy));
        const updatedRows = sortedRows.slice(
          0 * updatedRowsPerPage,
          0 * updatedRowsPerPage + updatedRowsPerPage,
        );
  
        setVisibleRows(updatedRows);
  
        // There is no layout jump to handle on the first page.
        setPaddingHeight(0);
      },
      [order, orderBy],
    );
  
  
  
    return (
      <Box sx={{ width: '100%' }}>
            <Typography variant='h6'>
                Rechercher une personne
            </Typography>
        <Paper sx={{ width: '100%', mb: 2 }} elevation={6}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row, index) => {
  
                      return (
                        <TableRow
                          hover
                          //onClick={}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.name}
                          sx={{ cursor: 'pointer' }}
                        >
                         
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            <Typography variant="body1" sx={{pl : 1}}>
                                {row.name}
                            </Typography>
                            
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                        </TableRow>
                      );
                    })
                  : null}
                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }