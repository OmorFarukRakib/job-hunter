import Modal from "react-bootstrap/Modal";
import {
  TextField,
  InputAdornment,
  MenuItem,
  InputLabel,
  Select,
  Typography,
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
import { useState } from "react";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
import { useEffect } from "react";
// const validationSchema = Yup.object({
//   oldPassword: Yup.string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters"),
//   newPassword: Yup.string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });

function CompanyPassEditModal(props) {
  const [passwordChangeFormData, setPasswordChangeFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState({
    isPasswordFormDataSubmitting: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    passwordChnageErrorMsg: "",
  });
  const [successMsg, setSuccessMsg] = useState({
    passwordChnageSuccessMsg: "",
  });
  const handlePasswordFormDataChange = (e) => {
    const { name, value } = e.target;
    setPasswordChangeFormData({
      ...passwordChangeFormData,
      [name]: value,
    });
  };
  useEffect(() => {
    setPasswordChangeFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrorMsg({
      passwordChnageErrorMsg: "",
    });
    setSuccessMsg({
      passwordChnageSuccessMsg: "",
    });
  }, [props.show]);

  const handlePasswordChangeFormSubmit = async (e) => {
    e.preventDefault();
    if (
      passwordChangeFormData.newPassword !==
      passwordChangeFormData.confirmPassword
    ) {
      setErrorMsg({
        ...errorMsg,
        passwordChnageErrorMsg: "Password does not match! Please try again!",
      });
      return;
    }
    setIsLoading({
      ...isLoading,
      isPasswordFormDataSubmitting: true,
    });
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    try {
      const response = await axios({
        method: "PUT",
        url:
          apiConfig.baseURL +
          apiConfig.company.updatePassword +
          `?oldPassword=${passwordChangeFormData.oldPassword}&newPassword=${passwordChangeFormData.newPassword}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // data: {
        //   name: companyFormData.name,
        //   webSite: companyFormData.webSite,
        //   address: companyFormData.address,
        //   description: companyFormData.description,
        //   companySize: companyFormData.companySize,
        //   contactPersonName: companyFormData.contactPersonName,
        //   email: companyFormData.email,
        //   phoneNumber: companyFormData.phoneNumber,
        // },
      });
      console.log("company pass change api res", response);
      const res = response.data;
      if (res.success === true) {
        setErrorMsg({
          ...errorMsg,
          passwordChnageErrorMsg: "",
        });
        setSuccessMsg({
          ...successMsg,
          passwordChnageSuccessMsg: "Password has been updated successfully!",
        });
        props.setFetchAgainFlag((prev) => prev + 1);
      } else {
        if (res.errorCode === 501) {
          setErrorMsg({
            ...errorMsg,
            passwordChnageErrorMsg:
              "Old Password is not valid! Please try again!",
          });
        } else {
          setErrorMsg({
            ...errorMsg,
            passwordChnageErrorMsg:
              "Something Went Wrong! Please try again later",
          });
        }
      }
    } catch (error) {
      console.log("error from catch", error);
      setErrorMsg({
        ...errorMsg,
        passwordChnageErrorMsg: "Something Went Wrong! Please try again later",
      });
    }
    setIsLoading({
      ...isLoading,
      isPasswordFormDataSubmitting: false,
    });
  };
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
          onSubmit={handlePasswordChangeFormSubmit}
          fullWidth
        >
          <TextField
            fullWidth
            type="password"
            label="Old Password"
            id="oldPassword"
            name="oldPassword"
            required
            onChange={handlePasswordFormDataChange}
            value={passwordChangeFormData.oldPassword}
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            id="newPassword"
            name="newPassword"
            required
            onChange={handlePasswordFormDataChange}
            value={passwordChangeFormData.newPassword}
          />
          <TextField
            fullWidth
            label="ConfirmPassword"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            onChange={handlePasswordFormDataChange}
            value={passwordChangeFormData.confirmPassword}
          />
          {/* <FormControlLabel
            required
            control={<Checkbox />}
            label="I have read and agree to the terms"
          /> */}
          {successMsg.passwordChnageSuccessMsg && (
            <Typography variant="h7" color="green" align="center">
              {successMsg.passwordChnageSuccessMsg}
            </Typography>
          )}
          {errorMsg.passwordChnageErrorMsg && (
            <Typography variant="h7" color="red" align="center">
              {errorMsg.passwordChnageErrorMsg}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading.isPasswordFormDataSubmitting}
          >
            {isLoading.isPasswordFormDataSubmitting === true
              ? "Please wait.."
              : "Password change"}
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
