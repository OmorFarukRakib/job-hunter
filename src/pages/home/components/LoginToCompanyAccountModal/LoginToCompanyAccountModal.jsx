import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import clsx from "clsx";
import Typography from "@mui/material/Typography";

// import styles from "./signinModal.module.css";
function SigninModal(props) {
  return (
    <Modal
      {...props}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal-login"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      //   backdrop="static"
      //   keyboard="false"
    >
      <Modal.Header className="px-4" closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          <Typography variant="h7" color="red">
            Warning
          </Typography>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Typography variant="h7" color="initial" align="center">
            {" "}
            Please Log in from a Company Account to post a job circular.
          </Typography>
        </div>
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default SigninModal;
