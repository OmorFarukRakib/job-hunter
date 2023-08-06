import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const columns = [
  { id: "firstName", label: "First Name", minWidth: 100, align: "center" },
  { id: "lastName", label: "Last Name", minWidth: 100, align: "center" },
  {
    id: "aimedIndustry",
    label: "Industry",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(firstName, lastName, aimedIndustry, email, phone) {
  return {
    firstName,
    lastName,
    aimedIndustry,
    email,
    phone,
  };
}

const rows = [
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),
  createData("Mr. Jhon", "Joe", "IT", "jhon@xcompany.com", "0199999999"),

  
];


export default function ProductListTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                key={"action"}
                align={"center"}
                style={{ minWidth: 100 }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      key={"action"}
                      align={"right"}
                      style={{ minWidth: 100 }}
                    >
                      <div style={{ display: "flex", gap: "1rem", justifyContent: 'center' }}>
                        <Button variant="outlined">Details</Button>
                        <Button variant="outlined" color="error">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
