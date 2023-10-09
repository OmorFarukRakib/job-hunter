import {
  TextField,
  InputAdornment,
  MenuItem,
  InputLabel,
  Select,
  Grid,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";
import styles from "./companyRegistrationForm.module.css";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import TermAndConditions from "../../../../TermsAndConditions/TermAndConditions";
import { useState } from "react";
import axios from "axios";
import apiConfig from "../../../../../apiConfig";
const industryOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Finance and Banking", label: "Finance and Banking" },
  {
    value: "Healthcare and Pharmaceuticals",
    label: "Healthcare and Pharmaceuticals",
  },
  { value: "Automotive", label: "Automotive" },
  { value: "Energy and Utilities", label: "Energy and Utilities" },
  { value: "Retail and E-commerce", label: "Retail and E-commerce" },
  { value: "Telecommunications", label: "Telecommunications" },
  { value: "Aerospace and Defense", label: "Aerospace and Defense" },
  { value: "Media and Entertainment", label: "Media and Entertainment" },
  { value: "Others", label: "Others" },
];
const companySizeOptions = [
  { value: "small", label: "Small [less than 50]" },
  { value: "medium", label: "Medium [50-250]" },
  { value: "large", label: "Large [more than 250]" },
];

const CompanyRegistrationForm = () => {
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);
  const [regiFormData, setRegiFormData] = useState({
    companyName: "",
    // industry: "",
    companyWebsite: "",
    companyAddress: "",
    companyDescription: "",
    companySize: "",
    contactPersonName: "",
    contactEmail: "",
    contactPhone: "",
    password: "",
    confirmPassword: "",
    authCode: "",
  });
  const [isRegiFormSubmitting, setIsRegiFormSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState({
    verificationCodeLoading: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    emailCodeErrorMsg: "",
    regiErrorMsg: "",
  });
  const [successMsg, setSuccessMsg] = useState({
    emailCodeSuccessMsg: "",
    RegiSuccessMsg: "",
  });
  // const formik = useFormik({
  //   initialValues: {
  //     companyName: "",
  //     industry: "",
  //     companyWebsite: "",
  //     companyAddress: "",
  //     companyDescription: "",
  //     companySize: "",
  //     contactPersonName: "",
  //     contactEmail: "",
  //     contactPhone: "",
  //     password: "",
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
  const handleOpenTermsAndConditions = () => {
    setOpenTermsAndConditions(true);
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setRegiFormData({
      ...regiFormData,
      [name]: value,
    });
  };

  const handleEmailCodeSent = async () => {
    setIsLoading({
      ...isLoading,
      verificationCodeLoading: true,
    });
    setErrorMsg({
      ...errorMsg,
      emailCodeErrorMsg: "",
    });
    setSuccessMsg({
      ...successMsg,
      emailCodeSuccessMsg: "",
    });
    // Call Email Sent Code API
    try {
      const response = await axios({
        method: "post",
        url:
          apiConfig.baseURL +
          apiConfig.auth.sendVerificationCode +
          `?email=${regiFormData.contactEmail}`,
        // data: {
        //   email: regiFormData,
        // },
      });
      console.log("email sent code api res", response);
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg({
          ...successMsg,
          emailCodeSuccessMsg:
            "Verification Code has been sent to your email! Please check!",
        });
      } else {
        setErrorMsg({
          ...errorMsg,
          emailCodeErrorMsg: "Something Went Wrong! Please Try Again!",
        });
      }
    } catch (error) {
      console.log("error from catch", error);
      setErrorMsg({
        ...errorMsg,
        emailCodeErrorMsg: "Something Went Wrong! Please Try Again!",
      });
    }
    setIsLoading({
      ...isLoading,
      verificationCodeLoading: false,
    });
    console.log("email code->");
  };

  const handleRegiFormSubmit = async (e) => {
    e.preventDefault();
    if (regiFormData.password !== regiFormData.confirmPassword) {
      setErrorMsg({
        ...errorMsg,
        regiErrorMsg: "Sorry Password Does Not Match! Please Try Again!",
      });
      return;
    }
    setIsRegiFormSubmitting(true);
    setErrorMsg({
      ...errorMsg,
      regiErrorMsg: "",
    });
    setSuccessMsg({
      ...successMsg,
      RegiSuccessMsg: "",
    });
    // Call API
    try {
      const response = await axios({
        method: "post",
        url: apiConfig.baseURL + apiConfig.auth.companyRegi,
        data: {
          name: regiFormData.companyName,
          webSite: regiFormData.companyWebsite,
          address: regiFormData.companyAddress,
          description: regiFormData.companyDescription,
          companySize: regiFormData.companySize,
          contactPersonName: regiFormData.contactPersonName,
          email: regiFormData.contactEmail,
          phoneNumber: regiFormData.contactPhone,
          password: regiFormData.password,
          authCode: regiFormData.authCode,
        },
      });
      const res = response.data;
      console.log("submit response", res);
      if (res.success === true) {
        setSuccessMsg({
          ...successMsg,
          RegiSuccessMsg:
            "Congratulations! Your account has been successfully created. Please login to continue",
        });
      } else {
        if (res.errorCode === 102) {
          setErrorMsg({
            ...errorMsg,
            regiErrorMsg: "Email Already registered! Try again with another email!",
          });
        } else {
          setErrorMsg({
            ...errorMsg,
            regiErrorMsg: "Something Went Wrong! Please Try Again Later!",
          });
        }
      }
    } catch (error) {
      setErrorMsg({
        ...errorMsg,
        regiErrorMsg: "Something Went Wrong! Please Try Again Later!",
      });
    }
    console.log("regi submited");
    setIsRegiFormSubmitting(false);
  };

  // const customtextFieldComp = <TextField fullWidth id="contactPhone" />;
  return (
    <>
      <TermAndConditions
        show={openTermsAndConditions}
        onHide={() => setOpenTermsAndConditions(false)}
      />
      <FormControl
        className={clsx(styles["employeeRegistrationForm-control"])}
        component="form"
        onSubmit={handleRegiFormSubmit}
        fullWidth
      >
        <TextField
          fullWidth
          label="Company Name"
          id="companyName"
          required
          name="companyName"
          value={regiFormData.companyName}
          onChange={handleFormDataChange}
        />

        {/* <FormControl fullWidth>
          <InputLabel id="industry-label">Industry</InputLabel>
          <Select
            labelId="Industry"
            multiline
            label="Industry"
            id="industry"
            name="industry"
            value={formik.values.industry}
            onChange={formik.handleChange}
            error={formik.touched.industry && Boolean(formik.errors.industry)}
          >
            {industryOptions.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <TextField
          fullWidth
          label="Company Description"
          required
          multiline
          rows={10}
          id="companyDescription"
          name="companyDescription"
          onChange={handleFormDataChange}
          value={regiFormData.companyDescription}
        />
        <FormControl fullWidth>
          <InputLabel id="company-label">Company Size</InputLabel>
          <Select
            labelId="Company Size"
            label="Company Size"
            id="companySize"
            name="companySize"
            required
            onChange={handleFormDataChange}
            value={regiFormData.companySize}
          >
            {companySizeOptions.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Company Address"
          id="companyAddress"
          name="companyAddress"
          required
          multiline
          onChange={handleFormDataChange}
          value={regiFormData.companyAddress}
        />
        <TextField
          fullWidth
          label="Company Website"
          multiline
          id="companyWebsite"
          name="companyWebsite"
          required
          onChange={handleFormDataChange}
          value={regiFormData.companyWebsite}
        />

        <TextField
          fullWidth
          label="Contact Person Name"
          id="contactPersonName"
          name="contactPersonName"
          required
          onChange={handleFormDataChange}
          value={regiFormData.contactPersonName}
        />
        <Grid
          container
          spacing={2}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Contact Email"
              id="contactEmail"
              name="contactEmail"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleFormDataChange}
              value={regiFormData.contactEmail}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              size="small"
              disabled={
                !regiFormData.contactEmail || isLoading.verificationCodeLoading
              }
              onClick={handleEmailCodeSent}
            >
              {isLoading.verificationCodeLoading === true
                ? "Sending Verification Code.."
                : "Send Code"}
            </Button>
          </Grid>
        </Grid>
        {successMsg.emailCodeSuccessMsg && (
          <Typography variant="h7" color="green" align="center">
            {successMsg.emailCodeSuccessMsg}
          </Typography>
        )}
        {errorMsg.emailCodeErrorMsg && (
          <Typography variant="h7" color="red" align="center">
            {errorMsg.emailCodeErrorMsg}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Email Code"
          // type="password"
          id="authCode"
          name="authCode"
          required
          onChange={handleFormDataChange}
          value={regiFormData.authCode}
        />
        {/* <PhoneInput
        id="contactPhone"
        placeholder="Enter phone number"
        // value={formik.values.contactPhone}
        // onChange={formik.handleChange}
        // error={formik.touched.contactPhone && !!formik.errors.contactPhone}
      /> */}
        <TextField
          fullWidth
          label="Contact Phone"
          id="contactPhone"
          name="contactPhone"
          required
          type="number"
          // inputProps={{
          //   pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
          //   title: "Phone number format: XXX-XXX-XXXX",
          // }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleFormDataChange}
          value={regiFormData.contactPhone}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          id="password"
          name="password"
          required
          onChange={handleFormDataChange}
          value={regiFormData.password}
        />
        <TextField
          fullWidth
          label="ConfirmPassword"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          onChange={handleFormDataChange}
          value={regiFormData.confirmPassword}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="I have read and agree to the terms"
          />
          <div
            style={{
              textDecoration: "underline",
              color: "#643393",
              cursor: "pointer",
            }}
            onClick={handleOpenTermsAndConditions}
          >
            show terms & conditions
          </div>
        </div>
        {errorMsg.regiErrorMsg && (
          <Typography variant="h7" color="red" align="center">
            {errorMsg.regiErrorMsg}
          </Typography>
        )}
        {successMsg.RegiSuccessMsg && (
          <Typography variant="h7" color="green" align="center">
            {successMsg.RegiSuccessMsg}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isRegiFormSubmitting}
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
          {isRegiFormSubmitting === true ? "Please Wait.." : "Sign up"}
        </Button>
      </FormControl>
    </>
  );
};

export default CompanyRegistrationForm;
