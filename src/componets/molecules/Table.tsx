import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableFooter from "@mui/material/TableFooter";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useCallback } from "react";
import { Button, TablePagination } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";
import MyButton from "../atoms/Button";
import exportFromJSON from "export-from-json";
import { AiFillEye } from "react-icons/ai";
import { Context } from "../../context";

interface Props {
  title: string;
  search?: boolean;
  data?: any[];
}

interface Data {
  firstAndLastName: string;
  view: string;
  state: string;
  city: string;
  dob: string;
  uhrsfMemberId: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "uhrsfMemberId",
    numeric: false,
    disablePadding: false,
    label: "Application No",
  },
  {
    id: "firstAndLastName",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "State",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "City",
  },
  {
    id: "dob",
    numeric: false,
    disablePadding: false,
    label: "DateTime",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "View",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead className="bg-gray-100">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className="font-medium text-black"
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className="text-gray-400 font-semibold"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  search?: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, title, search, setSearch } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
      className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center gap-4"
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          id="tableTitle"
          component="div"
          className="font-semibold text-center sm:text-left"
        >
          {title}
        </Typography>
      )}
      {search && (
        <input
          type="search"
          className="border border-gray-300 py-1 flex-1 focus:outline-none mb-2 focus:border-blue-400 px-2 rounded-md"
          placeholder="search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
    </Toolbar>
  );
}

export default function EnhancedTable({ title, search, data }: Props) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("uhrsfMemberId");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [dense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [rows, setRows] = React.useState<any[]>([]);
  const store = React.useContext(Context);

  // let rows = data?.length ? data : ROWS;
  const allRows = data;
  const navigate = useNavigate();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: Data) => n.firstAndLastName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<unknown>, obj: any) => {
    store?.action.setTitle(title);
    store?.action.setUserDetails(obj);

    navigate("/application/add-user");
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const filterData = useCallback(() => {
    if (searchValue === "") setRows(allRows as any);
    else {
      const temp: any = allRows?.filter((row) => {
        return row.firstAndLastName.includes(searchValue);
      });
      console.log(temp);

      setRows(temp);
    }
  }, [allRows, searchValue]);

  useEffect(() => {
    filterData();
  }, [filterData, searchValue]);

  console.log(title);
  const dateFormat = (date: string) => {
    const splitDateTime = date.split("T")[0];
    return new Date(splitDateTime).toLocaleDateString("en-IN", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          search={search}
          setSearch={setSearchValue}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(
                  page * rowsPerPage,
                  search ? page * rowsPerPage + rowsPerPage : 3
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(`${row.firstAndLastName}`);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      className="hover:bg-gray-100"
                    >
                      <TableCell
                        onClick={(event) => handleClick(event, row)}
                        component="th"
                        id={labelId}
                        className="hover:text-blue-500 cursor-pointer"
                      >
                        {row.uhrsfMemberId}
                      </TableCell>
                      <TableCell>{row.firstAndLastName}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{dateFormat(row.dob as string)}</TableCell>
                      <TableCell onClick={(event) => handleClick(event, row)}>
                        <AiFillEye />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              {search && (
                <MyButton
                  variant="approve"
                  onClick={() =>
                    exportFromJSON({
                      data: rows,
                      fileName: "demo",
                      exportType: exportFromJSON.types.csv,
                    })
                  }
                  className="mt-4 ml-4 text-sm w-fit"
                >
                  Export to CSV
                </MyButton>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
        {search && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      {!search && (
        <Box className="flex justify-end mr-6 mb-8">
          <Button
            className="bg-dark_blue text-white capitalize"
            onClick={() => {
              store?.action.setTableName(title);

              if (title === "Application Received") navigate("/application");
              else if (title === "Members") navigate("/application/members");
            }}
          >
            View All
          </Button>
        </Box>
      )}
    </Box>
  );
}
