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
import AdminJobDeleteModal from "../AdminJobDeleteModal/AdminJobDeleteModal"
const columns = [
  {
    id: "companyName",
    label: "Company Name",
    minWidth: 100,
    align: "center",
  },
  { id: "industry", label: "Industry", minWidth: 100, align: "center" },
  {
    id: "jobTitle",
    label: "Job Title",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "jobType",
    label: "Job Type",
    minWidth: 100,
    align: "center",
    format: (value) => value.toString(),
  },
  {
    id: "salary_Estimation",
    label: "Salary Estimation",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "applicationDeadline",
    label: "Application Deadline",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
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

const rows = [
  createData(
    "X Company",
    "IT",
    "Software Developer",
    "Full-Time",
    "1500",
    "2000",
    "12-12-23"
  ),
  createData(
    "X Company",
    "IT",
    "Software Developer",
    "Full-Time",
    "1500",
    "2000",
    "12-12-23"
  ),
  createData(
    "X Company",
    "IT",
    "Software Developer",
    "Full-Time",
    "1500",
    "2000",
    "12-12-23"
  ),
  createData(
    "X Company",
    "IT",
    "Software Developer",
    "Full-Time",
    "1500",
    "2000",
    "12-12-23"
  ),
  createData(
    "X Company",
    "IT",
    "Software Developer",
    "Full-Time",
    "1500",
    "2000",
    "12-12-23"
  ),
];

export default function JobListTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showJobDetailsModal, setShowJobDetailsModal] = React.useState(false);
  const [showJobDeleteModal, setShowJobDeleteModal] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleJobDetailsModalOpen = () => {
    setShowJobDetailsModal(true)
  }
  const handleJobDeleteModalOpen = () => {
    setShowJobDeleteModal(true);
  }

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
        jobDetailsData={null}
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
                            variant="contained"
                            onClick={handleJobDetailsModalOpen}
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
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleJobDeleteModalOpen}
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
