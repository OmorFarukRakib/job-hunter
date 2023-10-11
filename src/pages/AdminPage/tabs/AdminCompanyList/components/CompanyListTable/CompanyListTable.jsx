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
import CompanyDeleteModal from "../CompanyDeleteModal/CompanyDeleteModal";
import StatusDiv from "../../../../../../components/StatusDiv/StatusDiv";
import CompanyStatusChangeOpt from "./CompanyStatusChangeOpt/CompanyStatusChangeOpt";
import styles from "./companyListTable.module.css";
import { useEffect } from "react";
const columns = [
  // { id: "companyName", label: "Company Name", minWidth: 100, align: "center" },
  // { id: "industry", label: "Industry", minWidth: 100, align: "center" },
  // {
  //   id: "companyAddress",
  //   label: "Company Address",
  //   minWidth: 100,
  //   align: "center",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "userName",
  //   label: "Contact Person Name",
  //   minWidth: 100,
  //   align: "center",
  //   format: (value) => value.toFixed(2),
  // },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "profileStatus",
    label: "Status",
    minWidth: 100,
    align: "center",
    format: (value) => value,
  },
  {
    id: "changeStatus",
    label: "Status Change Action",
    minWidth: 100,
    align: "center",
    format: (value) => value,
  },
];



export default function CompanyListTable(props) {
  const [companyDetailsData, setCompanyDetailsData] = useState({});
  const [allCompanyData, setAllCompanyData] = useState([])
  const [companyDetailsModalShow, setCompanyDetailsModalShow] = useState(false);
  const [companyIDForDelete, setCompanyIDForDelete] = useState();
  const [companyDeleteModalShow, setCompanyDeleteModalShow] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  useEffect(() => {
    setAllCompanyData(props.allCompanyData);
  }, [props])


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
                    sx={{
                      backgroundColor: "#643393",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}

                <TableCell
                  key={"action"}
                  align={"center"}
                  style={{ minWidth: 100 }}
                  sx={{
                    backgroundColor: "#643393",
                    color: "white",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCompanyData
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
                        console.log(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {/* {column.format && typeof value === "number"
                              ? column.format(value)
                              : value} */}
                            {column.id === "profileStatus" ? (
                              <div className={styles["statusColumn-wrapper"]}>
                                <StatusDiv statusType={value} />
                              </div>
                            ) : (
                              <>
                                {column.id === "changeStatus" ? (
                                  <>
                                    <CompanyStatusChangeOpt
                                      companyEmail={row.email}
                                      currentStatus={row.profileStatus}
                                      setFetchAgain={props.setFetchAgain}
                                    />
                                  </>
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
                            onClick={() => openCompanyDetailsModalHandler(row)}
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
                            onClick={() =>
                              openCompanyDeleteModalHandler(row.companyName)
                            }
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
          count={allCompanyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
