import React, { useState } from 'react'
import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { FormControl } from "@mui/material";
import clsx from "clsx";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from './verifyRegistration.module.css'
const VerifyRegistration = () => {
  const [secretCode, setSecretCode] = useState()
  const handleChange = (value) => {
     setSecretCode(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('verify with secret code', secretCode)
  }
  return (
    <div className={clsx(styles["verifyRegistration_wrapper"])}>
      <div className={clsx(styles["verify_text"])}>
        Please check your email for the verification code.
      </div>
      <FormControl component="form" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          fullWidth
          label="Secret Code"
          id="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e.target.value)}
          value={secretCode}
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
          Verify
        </Button>
      </FormControl>
    </div>
  );
}

export default VerifyRegistration