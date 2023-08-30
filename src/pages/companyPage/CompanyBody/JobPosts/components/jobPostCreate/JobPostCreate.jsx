import React from "react";
import { useState } from "react";

import styles from "./jobPostCreate.module.css";
import clsx from "clsx";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";

import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useFormik, Field } from "formik";
import * as Yup from "yup";

import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import JobPostFormModal from "../JobPostFormModal/JobPostFormModal";

// Job post create btn.
const JobPostCreate = () => {
  const [jobPostCreateModalShow, setJobPostCreateModalShow] = useState(false);
  return (
    <div className={clsx(styles["jobPostCreate-wrapper"])}>
      <Button
        variant="contained"
        size="large"
        onClick={() => setJobPostCreateModalShow(true)}
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
        Add a new Job Circular
      </Button>
      <JobPostFormModal
        show={jobPostCreateModalShow}
        onHide={() => setJobPostCreateModalShow(false)}
        formData={null}
      />
    </div>
  );
};

export default JobPostCreate;
