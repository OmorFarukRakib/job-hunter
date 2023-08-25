// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./jobApplicantShortListedModal.module.css";

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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import RemoveFromShortListModal from "./RemoveFromShortListModal";
import { useEffect } from "react";

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
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "Phone",
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
  // {
  //   id: "action",
  //   label: "Action",
  //   minWidth: 170,
  //   align: "center",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
];

function createData(
  id,
  firstName,
  lastName,
  LastEducationDegree,
  currentCompany,
  totalExp,
  expectedSalary,
  aboutMe,
  email,
  phone,
  isShortListed
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
    aboutMe,
    email,
    phone,
    isShortListed,
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
    "50,000",
    "ABOUT ME SECTION 1",
    "USER@gmail.com",
    "11111111111",
    true
  ),
  createData(
    "2",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION 2",
    "USER@gmail.com",
    "11111111111",
    true
  ),
  createData(
    "3",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION 3",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "4",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION 4",
    "USER@gmail.com",
    "11111111111",
    true
  ),
  createData(
    "5",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "6",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "7",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "8",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "9",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "10",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "11",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "12",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "13",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "14",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "15",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "16",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "17",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "18",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
  createData(
    "19",
    "Jhon",
    "Doe",
    "Bsc at CSE",
    "ABC Company",
    "3 years",
    "50,000",
    "ABOUT ME SECTION",
    "USER@gmail.com",
    "11111111111",
    false
  ),
];

function JobApplicantShortListedModal(props) {

  //   const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showRemoveFromShortListModal, setShowRemoveFromShortListModal] =
    React.useState(false);
  const [selectedApplicantData, setSelectedApplicantData] = React.useState({});
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemoveFromShortListBtn = (applicantData) => {
    setSelectedApplicantData(applicantData);
    setShowRemoveFromShortListModal(true);
  };
  React.useEffect(() => {
    setSelectedApplicantData({});
  }, [showRemoveFromShortListModal]);

useEffect(() => {
 console.log("short-list-modal called")
}, [])
  // Row component Render
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          {/* <TableRow sx={{ borderBottom: "unset" }}> */}
          <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          <TableCell align="center">{row.id}</TableCell>
          <TableCell align="center">{row.firstName}</TableCell>
          <TableCell align="center">{row.lastName}</TableCell>
          <TableCell align="center">{row.LastEducationDegree}</TableCell>
          <TableCell align="center">{row.currentCompany}</TableCell>
          <TableCell align="center">{row.totalExp}</TableCell>
          <TableCell align="center">{row.expectedSalary}</TableCell>
          <TableCell align="center">{row.email}</TableCell>
          <TableCell align="center">{row.phone}</TableCell>
          <TableCell align="center">
            <Button
              variant="contained"
              size="small"
              endIcon={<CloudDownloadIcon />}
            >
              Download
            </Button>
          </TableCell>
          {/* <TableCell align="center">
            <Button
              variant="contained"
              size="small"
              endIcon={<DeleteForeverIcon />}
              onClick={() => handleRemoveFromShortListBtn(row)}
            >
              Remove
            </Button>
          </TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="p" gutterBottom component="div">
                  {row.aboutMe}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  nisi fugit iusto nemo delectus incidunt quibusdam nihil
                  debitis excepturi ducimus nam dolores amet explicabo, quod
                  tenetur ipsum illum. Eius tenetur minima ipsa adipisci
                  molestiae libero, quidem magnam, repellat a corrupti atque
                  aspernatur quam consequuntur veniam facere dolores unde. Dicta
                  reprehenderit reiciendis necessitatibus ipsam eius, expedita
                  eveniet quod dolores dolor molestiae placeat quis vero vel
                  quos amet eaque eos hic nostrum. Modi assumenda consectetur
                  ratione asperiores quia aliquid ea! Maxime voluptatibus, earum
                  tempora, nihil alias provident, optio iste suscipit sequi rem
                  illum voluptas voluptatum debitis esse architecto laboriosam
                  fugit recusandae harum. Sit culpa id odit, quisquam aperiam
                  quasi repudiandae iure tempore voluptatibus quidem ipsa,
                  dolore ipsam tempora nihil porro ab. Possimus odit commodi
                  provident quos explicabo! Reprehenderit possimus fuga quam,
                  dignissimos numquam velit praesentium, dolore blanditiis saepe
                  aut quidem sunt fugit. Deserunt dignissimos voluptatum ea
                  fugit ullam ducimus dicta, voluptatem delectus facere animi
                  hic possimus enim excepturi quo at. Numquam omnis doloremque
                  impedit cumque repellendus maiores beatae magni minima fuga
                  debitis ipsum officiis temporibus quisquam, voluptatibus
                  eveniet minus eligendi officia rem optio facere veritatis. Ex
                  esse dolorem, iusto placeat ad aliquid, in saepe maiores atque
                  nostrum eum sint quam animi a recusandae inventore, quisquam
                  fugit! Dolore, ratione commodi. Optio nulla dolore dolorem ab
                  quisquam eos non vero quam, ut quod officiis numquam
                  repellendus! Voluptatem nesciunt architecto eaque, dolorem
                  reprehenderit facere, tenetur facilis nam alias nihil,
                  deserunt quisquam tempora corporis. Ab ad eum iusto aut,
                  explicabo, amet iste omnis illum quam laboriosam ratione id
                  laudantium? Quia cupiditate quasi magni odio soluta corrupti
                  hic necessitatibus dolorem ad rem porro omnis adipisci aliquid
                  eius, nihil beatae rerum ullam quas saepe eum modi
                  reprehenderit. Voluptas dignissimos repellendus, laboriosam
                  quaerat iusto cupiditate obcaecati labore aut facere, esse
                  dolorum, consequatur ipsa dolorem debitis culpa hic repellat
                  enim?
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
      <Modal.Header className="px-4" closeButton>
        <Modal.Title
          className="ms-auto"
          id="contained-modal-title-vcenter"
          centered
        >
         Short listed Applicants
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <RemoveFromShortListModal
            show={showRemoveFromShortListModal}
            onHide={() => setShowRemoveFromShortListModal(false)}
            applicantData={selectedApplicantData}
          />
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
                    .filter((row) => row.isShortListed === true)
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
        </>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default JobApplicantShortListedModal;
