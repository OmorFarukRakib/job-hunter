import Modal from "react-bootstrap/Modal";
import {
  TextField,
  InputAdornment,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./companyPassEditModal.module.css";

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function CompanyPassEditModal(props) {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("ok");
      console.log(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      //   formik.resetForm();
    },
  });
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
          Password Change
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          className={clsx(styles["companyPassEditModal-control"])}
          component="form"
          onSubmit={formik.handleSubmit}
          fullWidth
        >
          <TextField
            fullWidth
            type="password"
            label="Old Password"
            id="oldPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
            error={formik.touched.oldPassword && !!formik.errors.oldPassword}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            id="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            error={formik.touched.newPassword && !!formik.errors.newPassword}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            fullWidth
            label="ConfirmPassword"
            type="password"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          {/* <FormControlLabel
            required
            control={<Checkbox />}
            label="I have read and agree to the terms"
          /> */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
          >
            Password change
          </Button>
        </FormControl>
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default CompanyPassEditModal;
