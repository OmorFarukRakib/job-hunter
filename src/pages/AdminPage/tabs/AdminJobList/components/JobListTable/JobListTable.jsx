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

import AdminJobDetailsModal from "../AdminJobDetailsModal/AdminJobDetailsModal";
import AdminJobDeleteModal from "../AdminJobDeleteModal/AdminJobDeleteModal";
import { useState } from "react";
import { useEffect } from "react";
import JobStatusChangeOpt from "../JobStatusChangeOpt/JobStatusChangeOpt";
import styles from "./jobListTable.module.css";
import StatusDiv from "../../../../../../components/StatusDiv/StatusDiv";
const columns = [
  {
    id: "companyName",
    label: "Company Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "title",
    label: "Job Title",
    minWidth: 100,
    align: "center",
  },
  {
    id: "industry",
    label: "Industry",
    minWidth: 100,
    align: "center",
  },
  {
    id: "companyEmail",
    label: "Company Email",
    minWidth: 100,
    align: "center",
  },
  {
    id: "companyPhoneNumber",
    label: "Company Contact Number",
    minWidth: 100,
    align: "center",
  },
  {
    id: "applicationDeadline",
    label: "Application Deadline",
    minWidth: 100,
    align: "center",
  },
  {
    id: "jobPostStatus",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
];

function createData(
  companyName,
  industry,
  jobTitle,
  jobType,
  salaryEstimationStart,
  salaryEstimationEnd,
  applicationDeadline
) {
  return {
    companyName,
    industry,
    jobTitle,
    jobType,
    salary_Estimation: `${salaryEstimationStart}$ - ${salaryEstimationEnd}$`,
    applicationDeadline,
  };
}

export default function JobListTable(props) {
  const [jobDataforDetailsModal, setJobDataforDetailsModal] = useState({})
  const [allJobsData, setAllJobsData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showJobDetailsModal, setShowJobDetailsModal] = React.useState(false);
  const [showJobDeleteModal, setShowJobDeleteModal] = React.useState(false);

  useEffect(() => {
    setAllJobsData(props.allJobsData);
  }, [props]);
  function formatDate(initialDate) {
    const date = new Date(initialDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleJobDetailsModalOpen = (jobDetails) => {
    setJobDataforDetailsModal(jobDetails)
    setShowJobDetailsModal(true);
  };
  const handleJobDeleteModalOpen = () => {
    setShowJobDeleteModal(true);
  };

  return (
    <>
      <AdminJobDeleteModal
        show={showJobDeleteModal}
        onHide={() => setShowJobDeleteModal(false)}
        jobID={null}
      />
      <AdminJobDetailsModal
        show={showJobDetailsModal}
        onHide={() => setShowJobDetailsModal(false)}
        jobDetailsData={jobDataforDetailsModal}
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
              {allJobsData
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
                        // console.log(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "jobPostStatus" ? (
                              <div className={styles["statusColumn-wrapper"]}>
                                <StatusDiv statusType={value} />
                                <JobStatusChangeOpt
                                  jobID={row.jobID}
                                  currentStatus={value}
                                  setFetchAgain={props.setFetchAgain}
                                />
                              </div>
                            ) : (
                              <>
                                {column.id === "applicationDeadline" ? (
                                  <>{formatDate(value)}</>
                                ) : (
                                  <>{value}</>
                                )}
                              </>
                            )}
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
                            variant="contained"
                            onClick={() => handleJobDetailsModalOpen(row)}
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
                            Details
                          </Button>
                          {/* <Button
                            variant="outlined"
                            color="error"
                            onClick={handleJobDeleteModalOpen}
                          >
                            Delete
                          </Button> */}
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
          count={allJobsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
