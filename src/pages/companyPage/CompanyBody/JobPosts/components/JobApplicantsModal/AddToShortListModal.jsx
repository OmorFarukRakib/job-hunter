// import Button from "react-bootstrap/Button";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import clsx from "clsx";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
function AddToShortListModal(props) {
  // const { applicantData } = props;
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

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
  }, [props.show]);

  const handleAddToShortList = async () => {
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
          }&isShortlisted=${true}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("add to short list api res", response);
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg("Successfully added to shortlist");
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
          Are you sure to short list this applicant?
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
          color="success"
          onClick={handleAddToShortList}
          disabled={isLoading}
        >
          {" "}
          {isLoading === true ? "Please Wait" : "Add to Short List"}
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddToShortListModal;
