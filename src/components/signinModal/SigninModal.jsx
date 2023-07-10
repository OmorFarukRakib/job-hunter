import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./signinModal.module.css";
function SigninModal(props) {
  return (
    <Modal
      {...props}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <SigninBody modalHideFun={props.onHide} />
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default SigninModal;
