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
import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./passwordResetModal.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import apiConfig from "../../../../apiConfig";
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

function PasswordResetModal(props) {
  const [passwordChangeFormData, setPasswordChangeFormData] = useState({
    authCode: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    setPasswordChangeFormData({
      authCode: "",
      password: "",
      confirmPassword: "",
    });
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(false);
  }, [props.show]);

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setPasswordChangeFormData({
      ...passwordChangeFormData,
      [name]: value,
    });
  };
  const handleFormDataSubmit = async (e) => {
    e.preventDefault();
    if(passwordChangeFormData.password !== passwordChangeFormData.confirmPassword) {
      setErrorMsg('Password does not match!')
      return
    }
    setIsSubmitting(true);
    try {
      const response = await axios({
        method: "put",
        url:
          apiConfig.baseURL +
          apiConfig.auth.passwordReset +
          `?email=${props.email}&authCode=${passwordChangeFormData.authCode}&password=${passwordChangeFormData.password}`,
        // data: {
        //   email: regiFormData,
        // },
      });
      console.log("email sent code api res", response);
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg("Password Reset Successful!");
      } else {
        setErrorMsg("Could not reset password! Something Went Wrong!");
      }
    } catch (error) {
      console.log("error in catch", error);
      setErrorMsg("Could not reset password! Something Went Wrong!");
    }
    setIsSubmitting(false);
  };
  // const formik = useFormik({
  //   initialValues: {
  //   //   oldPassword: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values, { setSubmitting }) => {
  //     console.log("ok");
  //     console.log(JSON.stringify(values, null, 2));
  //     alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //     //   formik.resetForm();
  //   },
  // });
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
          className={clsx(styles["userPassEditModal-control"])}
          component="form"
          onSubmit={handleFormDataSubmit}
          fullWidth
        >
          <Typography variant="h7" color="initial">Please check your email for the code</Typography>
          <TextField
            fullWidth
            // type="password"
            label="Code"
            id="authCode"
            name="authCode"
            value={passwordChangeFormData.authCode}
            onChange={handleFormDataChange}
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            id="password"
            name="password"
            onChange={handleFormDataChange}
            value={passwordChangeFormData.password}
          />
          <TextField
            fullWidth
            label="ConfirmPassword"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleFormDataChange}
            value={passwordChangeFormData.confirmPassword}
          />
          {/* <FormControlLabel
            required
            control={<Checkbox />}
            label="I have read and agree to the terms"
          /> */}
          {errorMsg && <Typography variant="h7" color="red">{errorMsg}</Typography>}
          {successMsg && <Typography variant="h7" color="green">{successMsg}</Typography>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting === true ? "Please Wait" : "Password change"}
          </Button>
        </FormControl>
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default PasswordResetModal;
