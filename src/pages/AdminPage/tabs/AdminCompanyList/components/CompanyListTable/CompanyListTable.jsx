import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import CompanyDetailsModal from "../CompanyDetailsModal/CompanyDetailsModal";
import CompanyDeleteModal from '../CompanyDeleteModal/CompanyDeleteModal'
const columns = [
  { id: "companyName", label: "Company Name", minWidth: 100, align: "center" },
  { id: "industry", label: "Industry", minWidth: 100, align: "center" },
  {
    id: "companyAddress",
    label: "Company Address",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "contactPersonName",
    label: "Contact Person Name",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "contactEmail",
    label: "Contact Email",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  companyName,
  industry,
  companyAddress,
  contactPersonName,
  contactEmail
) {
  return {
    companyName,
    industry,
    companyAddress,
    contactPersonName,
    contactEmail,
  };
}

const rows = [
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
  createData("X-Company", "IT", "138-street", "Mr Jhon", "jhon@xcompany.com"),
];

export default function CompanyListTable() {
  const [companyDetailsData, setCompanyDetailsData] = useState({});
  const [companyDetailsModalShow, setCompanyDetailsModalShow] = useState(false);
  const [companyIDForDelete, setCompanyIDForDelete] = useState();
  const [companyDeleteModalShow, setCompanyDeleteModalShow] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const openCompanyDetailsModalHandler = (row) => {
    setCompanyDetailsModalShow(true);
    setCompanyDetailsData(row);
  };
  const openCompanyDeleteModalHandler = (companyID) => {
    setCompanyDeleteModalShow(true);
    setCompanyIDForDelete(companyID);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <CompanyDetailsModal
        show={companyDetailsModalShow}
        onHide={() => setCompanyDetailsModalShow(false)}
        companyDetailsData={companyDetailsData}
      />
      <CompanyDeleteModal
        show={companyDeleteModalShow}
        onHide={() => setCompanyDeleteModalShow(false)}
        companyID={companyIDForDelete}
      />

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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
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
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => openCompanyDetailsModalHandler(row)}
                          >
                            Details
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => openCompanyDeleteModalHandler(row.companyName)}
                          >
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
    </>
  );
}
