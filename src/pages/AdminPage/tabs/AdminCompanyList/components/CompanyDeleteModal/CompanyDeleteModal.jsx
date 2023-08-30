// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./companyDeleteModal.module.css";
import { Button } from "@mui/material";

function CompanyDeleteModal({ show, onHide, companyID }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName={styles["custom-modal-for-companyDeleteModal"]}
      //   dialogClassName="custom-modal-for-companyDetails"
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
          ARE YOU SURE?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ARE YOU SURE YOU WANT TO DELETE THE SELECTED COMPANY PROFILE?
        <br />
        Company Name: {companyID}
        <br />
        Note: This can not be undone.
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button color="error" variant="contained" onClick={() => onHide()}>
          DELETE
        </Button>
        <Button variant="outlined" onClick={() => onHide()}>
          DISCARD
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompanyDeleteModal;
