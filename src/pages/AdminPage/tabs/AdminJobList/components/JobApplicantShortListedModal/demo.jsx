import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./jobApplicantModal.module.css";

// Table
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "id", label: "Id", minWidth: 170, align: "center" },
  { id: "firstName", label: "First Name", minWidth: 170, align: "center" },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "LastEducationDegree",
    label: "Last Education Degree",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "currentCompany",
    label: "Current Company",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "totalExp",
    label: "Total Experience",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "expectedSalary",
    label: "Expected Salary",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  id,
  firstName,
  lastName,
  LastEducationDegree,
  currentCompany,
  totalExp,
  expectedSalary
) {
  //   const density = population / size;
  return {
    id,
    firstName,
    lastName,
    LastEducationDegree,
    currentCompany,
    totalExp,
    expectedSalary,
  };
}

const rows = [
  createData(
    "1",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "2",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "3",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "4",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "5",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "6",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "7",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "8",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "9",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "10",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "11",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "12",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "13",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "14",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "15",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "16",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "17",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "18",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
  createData(
    "19",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000"
  ),
];

function JobApplicantModal(props) {
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
    <Modal
      {...props}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal-for-jobApplicant"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" centered>
          All applicants list
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default JobApplicantModal;
