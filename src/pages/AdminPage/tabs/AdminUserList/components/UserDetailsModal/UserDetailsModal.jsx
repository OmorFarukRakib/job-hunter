// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./userDetailsModal.module.css";
import { Button } from "@mui/material";




function UserDetailsModal({ show, onHide, userData }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal-for-companyDetails"
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
          User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={clsx(styles["userProfile-wrapper"])}>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>
              First Name
            </div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {userData.firstName}
            </div>
          </div>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>
              Last Name
            </div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {userData.lastName}
            </div>
          </div>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>Skills</div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {/* {userData.skills.join(", ")} */}
              OK
            </div>
          </div>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>
              Last Education Qualification
            </div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {userData.educationQualification}
            </div>
          </div>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>
              Aimed Industry
            </div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {userData.interestedIndustry}
            </div>
          </div>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>
              Salary Expectations(min)
            </div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {userData.salaryExpectationMin}
            </div>
          </div>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>
              Address
            </div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {userData.address}
            </div>
          </div>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>
              Contact Email
            </div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {userData.email}
            </div>
          </div>
          <div className={clsx(styles["userProfile-Info"])}>
            <div className={clsx(styles["userProfile-info-title"])}>
              Contact Phone
            </div>
            <div className={clsx(styles["userProfile-info-value"])}>
              {userData.phoneNumber}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{display: 'flex', justifyContent: 'center'}}>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDetailsModal;
