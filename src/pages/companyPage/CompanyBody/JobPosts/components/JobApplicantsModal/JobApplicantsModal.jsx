// import Button from "react-bootstrap/Button";
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
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
const columns = [
  { id: "id", label: "Id", minWidth: 50, align: "start" },
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
  {
    id: "downloadCVbtn",
    label: "Download CV",
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
  //   const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Row component Render
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="center">{row.firstName}</TableCell>
          <TableCell align="center">{row.lastName}</TableCell>
          <TableCell align="center">{row.LastEducationDegree}</TableCell>
          <TableCell align="center">{row.currentCompany}</TableCell>
          <TableCell align="center">{row.totalExp}</TableCell>
          <TableCell align="center">{row.expectedSalary}</TableCell>
          <TableCell align="center">
            <Button variant="contained" endIcon={<CloudDownloadIcon />}>
              Download
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="p" gutterBottom component="div">
                  Meet John Doe, a skilled professional in the field of Computer
                  Science and Engineering (CSE). With a solid educational
                  background and a graduate degree in CSE, John has developed a
                  strong foundation in various areas of computer science. Over
                  the past three years, John has honed his expertise while
                  working at ABC Company. His experience in the company has
                  allowed him to tackle complex challenges, collaborate with
                  diverse teams, and deliver exceptional results. John's passion
                  for technology, coupled with his strong problem-solving skills
                  and attention to detail, has consistently driven his success.
                  He is committed to staying up-to-date with the latest
                  advancements in the industry, continuously expanding his
                  knowledge and skills. With his dedication and expertise, John
                  is poised to make significant contributions in the field of
                  CSE.
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

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
      <Modal.Header closeButton>
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
                  <TableCell align={"center"} style={{ minWidth: 150 }}>
                    About Applicant
                  </TableCell>
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
                  .map((row) => (
                    <Row key={row.id} row={row} />
                  ))}
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
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default JobApplicantModal;
