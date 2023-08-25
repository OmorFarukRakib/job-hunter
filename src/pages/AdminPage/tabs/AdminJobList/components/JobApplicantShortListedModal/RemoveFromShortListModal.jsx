// import Button from "react-bootstrap/Button";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import clsx from "clsx";
import { Typography } from "@mui/material";
function AddToShortListModal(props) {
  const handleAddToShortList = () => {
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
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="p" component="p">
          Do you relly wish to Remove this Applicant from short?
          <br />
          Applicant name: {props.applicantData.firstName}{" "}
          {props.applicantData.lastName}
        </Typography>
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
          onClick={handleAddToShortList}
        >
          {" "}
          Remove from Short List
        </Button>
        <Button variant="outlined" onClick={props.onHide}>
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddToShortListModal;
