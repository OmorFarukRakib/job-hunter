import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { FormControl } from "@mui/material";
import clsx from "clsx";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlobalLoadingModal from "../../components/GlobalLoadingModal/GlobalLoadingModal";
import PasswordResetModal from "./components/passwordResetModal/PasswordResetModal";
import Snackbar from '../../components/Snackbar/Snackbar'
import styles from "./forgotPassword.module.css";
import axios from "axios";
import apiConfig from "../../apiConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [OpenPasswordResetModal, setOpenPasswordResetModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [confirmationMsg, setConfirmationMsg] = useState("asdad")
  const resetStates = () => {
    setError(false)
    setSuccess(false)
    confirmationMsg("")
    setLoading(false)
  }
  const handleShowLoading = async () => {
    setLoading(true);
    await wait(1);
    setLoading(false);
    setSuccess(true)
    setConfirmationMsg("Code sent successfull!")
  };

  function wait(seconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(); // Resolves the promise after the specified time
      }, seconds * 1000); // Convert seconds to milliseconds
    });
  }

  const handleChange = (value) => {
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    console.log('submittted', email)
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url:
          apiConfig.baseURL +
          apiConfig.auth.sendVerificationCode +
          `?email=${email}`,
        // url: apiConfig.baseURL + apiConfig.public.fetchAllJobPosts,
      });
      console.log("email verification api res", response);
      const res = response.data;
      if(res.success === true) {
         setOpenPasswordResetModal(true);
      }
    } catch (error) {
      console.log('error in catch', error)
      
    }
    setLoading(false);

   
    console.log("forgot password to", email);
  };
  return (
    <>
      {/* {loading === true ? <GlobalLoadingModal/> : null} */}
      {loading && <GlobalLoadingModal />}
      {/* {error && <Snackbar type="error" msg={confirmationMsg} />}  */}
      {/* {success && <Snackbar type="success" msg={confirmationMsg} />}  */}
      <Snackbar
        open={success}
        severity="success"
        message={confirmationMsg}
        reset={resetStates}
      />
      <Snackbar
        open={error}
        severity="error"
        message={confirmationMsg}
        reset={resetStates}
      />
      <div className={clsx(styles["forgotPassword_wrapper"])}>
        <PasswordResetModal
          email={email}
          show={OpenPasswordResetModal}
          onHide={() => setOpenPasswordResetModal(false)}
        />

        <div className={clsx(styles["verify_text"])}>
          Provide the email for reseting the password
        </div>
        <FormControl component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            required
            id="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleChange(e.target.value)}
            value={email}
          />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: "0.7rem",
              borderRadius: "20px",
              background: "#F6953F",
              color: "white",
              "&:hover": {
                backgroundColor: "#f6943fbc",

                borderColor: "#0062cc",
                boxShadow: "none",
              },
            }}
          >
            Send code
          </Button>
          {/* <Button onClick={handleShowLoading}>Show loading</Button> */}
        </FormControl>
      </div>
    </>
  );
};

export default ForgotPassword;
