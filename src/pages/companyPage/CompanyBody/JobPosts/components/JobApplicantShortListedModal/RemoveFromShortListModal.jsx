// import Button from "react-bootstrap/Button";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import clsx from "clsx";
import { Typography } from "@mui/material";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
function RemoveFromShortListModal(props) {
  const [applicantForShortList, setApplicantForShortList] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function isEmptyObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false; // If at least one property is found, the object is not empty
      }
    }
    return true; // If no properties are found, the object is empty
  }
  useEffect(() => {
    console.log(props.applicantData);
    if (!isEmptyObject(props.applicantData)) {
      setApplicantForShortList(props.applicantData);
    }
  }, [props]);
  const handleRemoveFromShortList = async () => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await axios({
        method: "GET",
        url:
          apiConfig.baseURL +
          apiConfig.company.shortListCandidate +
          `?jobId=${applicantForShortList.jobId}&candidatesId=${
            applicantForShortList.appliedBy
          }&isShortlisted=${false}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Remove from short list api res", response);
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg("Successfully Remove from shortlist");
        props.setFetchAgain((prev) => prev + 1);
      } else {
        console.log(
          applicantForShortList.jobId,
          applicantForShortList.appliedBy
        );
        setErrorMsg("Something Went Wrong! Please try Again Later!");
      }
    } catch (error) {
      console.log("error from catch", error);
      setErrorMsg("Something Went Wrong! Please try Again Later!");
    }
    setIsLoading(false);
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
          Are you Sure? {props.applicantData.jobId}
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
          Are you sure to Remove this applicant from shortlist?
          <br />
          Applicant name: {applicantForShortList.firstName}{" "}
          {applicantForShortList.lastName}
        </Typography>
        {errorMsg.length > 0 && (
          <Typography variant="h6" color="red" align="center">
            {errorMsg}
          </Typography>
        )}
        {successMsg.length > 0 && (
          <Typography variant="h6" color="green" align="center">
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
          onClick={handleRemoveFromShortList}
          disabled={isLoading}
        >
          {" "}
          {isLoading === true ? "Please Wait" : "Remove from Short List"}
        </Button>
        <Button variant="outlined" onClick={props.onHide}>
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveFromShortListModal;
