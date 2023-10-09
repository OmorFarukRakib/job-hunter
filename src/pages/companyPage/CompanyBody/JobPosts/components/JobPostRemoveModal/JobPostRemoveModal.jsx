// import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import clsx from "clsx";
import styles from "./jobPostRemoveModal.module.css";
import { Typography } from "@mui/material";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
function JobPostRemoveModal(props) {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleJobRemove = async () => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await axios({
        method: "DELETE",
        url:
          apiConfig.baseURL +
          apiConfig.company.deleteJobPost +
          `?jobId=${props.removePostID}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("delete short list api res", response);
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg("Successfully removed the job post");
        props.setFetchAgain((prev) => prev + 1);
      } else {
        setErrorMsg("Sorry! Could not remove the job post. Try again later.");
      }
    } catch (error) {
      console.log("error from catch");
      setErrorMsg("Sorry! Could not remove the job post. Try again later.");
    }
    setIsLoading(false);
    // props.onHide();
  };
  const handleClose = () => {
    setErrorMsg("");
    setSuccessMsg("");
    props.onHide();
  };
  return (
    <Modal
      {...props}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      //   dialogClassName="custom-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header className="px-4" closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          Are you Sure?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   justifyItems: "center",
      //   width: "100%",
      // }}
      >
        <Typography variant="p" component="p">
          Do you relly wish to delete this Job Post with title? This process can
          not be undone.
        </Typography>
        {errorMsg.length > 0 && (
          <Typography variant="h7" color="red" align="center">
            {errorMsg}
          </Typography>
        )}
        {successMsg.length > 0 && (
          <Typography variant="h7" color="green" align="center">
            {successMsg}
          </Typography>
        )}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={handleJobRemove}
          disabled={isLoading}
        >
          {" "}
          {isLoading === true ? "Please Wait" : "Remove"}
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default JobPostRemoveModal;
