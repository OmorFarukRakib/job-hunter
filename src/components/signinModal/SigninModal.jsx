import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SigninBody from "./signinBody/SigninBody";
function SigninModal(props) {
  return (
    <Modal
      {...props}
      //   size="sm"
    //   dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <SigninBody />
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default SigninModal;
