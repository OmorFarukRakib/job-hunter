// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./jobApplicantModal.module.css";

// Table
import React from "react";
import { useState, useEffect } from "react";

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
import GradingIcon from "@mui/icons-material/Grading";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import AddToShortListModal from "./AddToShortListModal";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
import downloadCV from "../../../../../../functions/downloadCV";

const columns = [
  // { id: "id", label: "Id", minWidth: 50, align: "start" },
  { id: "firstName", label: "First Name", minWidth: 170, align: "center" },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "lastEducationDegree",
    label: "Last Education Degree",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "currentCOmpany",
    label: "Current Company",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "experience",
    label: "Experience",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "totalExperienceInYear",
    label: "Total Experience in Year",
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
  // {
  //   id: "aboutMe",
  //   label: "About Me",
  //   minWidth: 170,
  //   align: "center",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  {
    id: "contactEmail",
    label: "Email",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "contactPhoneNumber",
    label: "Phone",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "isShortlisted",
  //   label: "is Short Listed",
  //   minWidth: 170,
  //   align: "center",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  {
    id: "cvLocation",
    label: "Download CV",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function JobApplicantModal(props) {
  //   const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fetchAgain, setFetchAgain] = useState(1);
  const [showAddToShortListModal, setShowAddToShortListModal] =
    React.useState(false);
  const [selectedApplicantData, setSelectedApplicantData] = React.useState({});

  const [allApplicantList, setAllApplicantList] = useState([]);
  const [ApplicantCount, setApplicantCount] = useState({
    allApplicant: 0,
    shortlisted: 0,
  });
  useEffect(() => {
    setApplicantCount({
      allApplicant: allApplicantList.length,
      shortlisted: allApplicantList.filter(
        (item) => item.isShortlisted === true
      ).length,
    });
  }, [allApplicantList]);

  const fetchAllApplicantList = async (jobID) => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    try {
      const response = await axios({
        method: "GET",
        url:
          apiConfig.baseURL +
          apiConfig.company.getAllApplicantList +
          `?jobId=${jobID}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("all applicant fetch api res", response);
      const res = response.data;
      if (res.success === true) {
        setAllApplicantList(res.data.jobs);
      } else {
        console.log("res -> false");
      }
    } catch (error) {
      console.log("first from catch", error);
    }
  };

  useEffect(() => {
    fetchAllApplicantList(props.jobID);
  }, [props, fetchAgain]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddToShortListBtn = (applicant) => {
    setSelectedApplicantData(applicant);
    setShowAddToShortListModal(true);
  };
  React.useEffect(() => {
    setSelectedApplicantData({});
  }, [showAddToShortListModal]);

  // Row component Render
  function Row(props) {
    const { applicant } = props;
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

          {/* <TableCell align="center">{applicant.id}</TableCell> */}
          <TableCell align="center">{applicant.firstName}</TableCell>
          <TableCell align="center">{applicant.lastName}</TableCell>
          <TableCell align="center">{applicant.lastEducationDegree}</TableCell>
          <TableCell align="center">{applicant.currentCOmpany}</TableCell>
          <TableCell align="center">{applicant.experience}</TableCell>
          <TableCell align="center">
            {applicant.totalExperienceInYear}
          </TableCell>
          <TableCell align="center">{applicant.expectedSalary}</TableCell>
          <TableCell align="center">{applicant.contactEmail}</TableCell>
          <TableCell align="center">{applicant.contactPhoneNumber}</TableCell>
          <TableCell align="center">
            <Button
              variant="contained"
              size="small"
              endIcon={<CloudDownloadIcon />}
              // disabled
              onClick={() => downloadCV(applicant.cvLocation)}
              sx={{
                background: "#F6953F",
                color: "white",
                "&:hover": {
                  backgroundColor: "#f6943fbc",

                  borderColor: "#0062cc",
                  boxShadow: "none",
                },
              }}
            >
              Download
            </Button>
          </TableCell>
          <TableCell align="center">
            {applicant.isShortlisted === true ? (
              <Button
                variant="contained"
                disabled
                size="small"
                endIcon={<CheckBoxIcon />}
              >
                Short-listed
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                endIcon={<GradingIcon />}
                onClick={() => handleAddToShortListBtn(applicant)}
              >
                Add to Shortlist
              </Button>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="p" gutterBottom component="div">
                  {applicant.aboutMe}
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
        <>
          <AddToShortListModal
            show={showAddToShortListModal}
            onHide={() => setShowAddToShortListModal(false)}
            applicantData={selectedApplicantData}
            setFetchAgain={setFetchAgain}
          />
          {allApplicantList.length === 0 ? (
            <>
              <div>
                <Typography variant="h7" color="initial" align="center">
                  No Applicant Data
                </Typography>
              </div>
            </>
          ) : (
            <>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <Typography variant="h8" color="initial" p={2}>
                  Total Applicant: {ApplicantCount.allApplicant}, Total
                  Shortlisted Applicant: {ApplicantCount.shortlisted}
                </Typography>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align={"center"}
                          style={{ minWidth: 150 }}
                          sx={{
                            backgroundColor: "#643393",
                            color: "white",
                          }}
                        >
                          About Applicant
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            sx={{
                              backgroundColor: "#643393",
                              color: "white",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allApplicantList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((applicant) => (
                          <Row key={applicant.id} applicant={applicant} />
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allApplicantList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </>
          )}
        </>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default JobApplicantModal;
