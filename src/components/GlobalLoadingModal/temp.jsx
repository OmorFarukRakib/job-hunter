import Modal from "react-bootstrap/Modal";
import {
  TextField,
  InputAdornment,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

import clsx from "clsx";
import { Button } from "@mui/material";
import styles from "./globalLoadingModal.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";
function GlobalLoadingModal(props) {
  return (
    <Modal
      {...props}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header className="px-4" closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          Please Wait
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PropagateLoader color="#36d7b7" loadding={true} />
        <Button variant="contained" fullWidth>
          Password change
        </Button>
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default GlobalLoadingModal;
