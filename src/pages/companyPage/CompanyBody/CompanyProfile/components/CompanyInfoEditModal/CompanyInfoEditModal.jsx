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
import styles from "./companyInfoEditModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
// const validationSchema = Yup.object({
//   companyName: Yup.string()
//     .required("Company name is required")
//     .max(50, "First name can not be longer than 50 letters"),
//   // industry: Yup.string()
//   //   .required("Last name is required")
//   //   .max(50, "Industry name can not be longer than 50 letters"),
//   companyWebsite: Yup.string()
//     .required("Last name is required")
//     .max(50, "Last name can not be longer than 50 letters"),
//   companyAddress: Yup.string()
//     .required("Last name is required")
//     .max(100, "Last name can not be longer than 100 letters"),
//   contactPhone: Yup.string()
//     .required("Last name is required")
//     .max(16, "phone number is too big"),
//   companyDescription: Yup.string()
//     .required("Last name is required")
//     .max(10000, "Last name can not be longer than 10000 letters"),
//   companySize: Yup.string()
//     .required("Last name is required")
//     .max(10000, "Last name can not be longer than 10000 letters"),
//   contactPersonName: Yup.string()
//     .required("Last name is required")
//     .max(50, "Last name can not be longer than 50 letters"),
//   contactEmail: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
// });

const industryOptions = [
  { value: "option1", label: "Technology" },
  { value: "option2", label: "Finance and Banking" },
  { value: "option4", label: "Healthcare and Pharmaceuticals" },
  { value: "option5", label: "Automotive" },
  { value: "option6", label: "Energy and Utilities" },
  { value: "option7", label: "Retail and E-commerce" },
  { value: "option8", label: "Telecommunications" },
  { value: "option9", label: "Aerospace and Defense" },
  { value: "option10", label: "Media and Entertainment" },
  { value: "option11", label: "Others" },
];
const companySizeOptions = [
  { value: "small", label: "Small [less than 50]" },
  { value: "medium", label: "Medium [50-250]" },
  { value: "large", label: "Large [more than 250]" },
];

function CompanyInfoEditModal(props) {
  const [companyFormData, setCompanyFormData] = useState({
    name: props.companyData.name,
    description: props.companyData.description,
    companySize: props.companyData.companySize,
    address: props.companyData.address,
    webSite: props.companyData.webSite,
    licenceNumber: props.companyData.licenceNumber,
    contactPersonName: props.companyData.contactPersonName,
    email: props.companyData.email,
    phoneNumber: props.companyData.phoneNumber,
  });
  const [isLoading, setIsLoading] = useState({
    isCompanyFormDataSubmitting: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    companyInfoChangeErrorMsg: "",
  });
  const [successMsg, setSuccessMsg] = useState({
    companyInfoChangeSuccessMsg: "",
  });
  // companyName: props.companyData.name ? props.companyData.name : "",
  useEffect(() => {
    setCompanyFormData({
      ...companyFormData,
      name: props.companyData.name,
      description: props.companyData.description,
      companySize: props.companyData.companySize,
      address: props.companyData.address,
      webSite: props.companyData.webSite,
      licenceNumber: props.companyData.licenceNumber,
      contactPersonName: props.companyData.contactPersonName,
      email: props.companyData.email,
      phoneNumber: props.companyData.phoneNumber,
    });
  }, [props]);
  useEffect(() => {
    setErrorMsg({
      ...setErrorMsg,
      companyInfoChangeErrorMsg: "",
    });
    setSuccessMsg({
      ...successMsg,
      companyInfoChangeSuccessMsg: "",
    });
  }, [props.show]);
  const handleCompanyFormDataChange = (e) => {
    const { name, value } = e.target;
    setCompanyFormData({
      ...companyFormData,
      [name]: value,
    });
  };
  const handleCompanyFormDataSubmit = async (e) => {
    e.preventDefault();
    setIsLoading({
      ...isLoading,
      isCompanyFormDataSubmitting: true,
    });
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    console.log(userData);
    try {
      const response = await axios({
        method: "PUT",
        url: apiConfig.baseURL + apiConfig.company.updateInfo,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          name: companyFormData.name,
          webSite: companyFormData.webSite,
          licenceNumber: companyFormData.licenceNumber,
          address: companyFormData.address,
          description: companyFormData.description,
          companySize: companyFormData.companySize,
          contactPersonName: companyFormData.contactPersonName,
          email: companyFormData.email,
          phoneNumber: companyFormData.phoneNumber,
        },
      });
      console.log("company info change api res", response);
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg({
          ...successMsg,
          companyInfoChangeSuccessMsg: "Company Information has been changed!",
        });
        props.setFetchAgainFlag((prev) => prev + 1);
      } else {
        setErrorMsg({
          ...errorMsg,
          companyInfoChangeErrorMsg:
            "Could not Change the current information. Please Try Again Later!",
        });
      }
    } catch (error) {
      console.log("error from catch", error);
      setErrorMsg({
        ...errorMsg,
        companyInfoChangeErrorMsg:
          "Something Went Wrong! Please Try Again Later!",
      });
    }
    setIsLoading({
      ...isLoading,
      isCompanyFormDataSubmitting: false,
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
          Company Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          className={clsx(styles["companyInfoEditModal-control"])}
          component="form"
          onSubmit={handleCompanyFormDataSubmit}
          fullWidth
        >
          <TextField
            fullWidth
            label="Company Name"
            id="name"
            name="name"
            required
            value={companyFormData.name}
            onChange={handleCompanyFormDataChange}
          />
          {/* <TextField
        select
        fullWidth
        label="Industry"
        id="industry"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.industry}
        error={formik.touched.industry && !!formik.errors.industry}
        helperText={formik.touched.industry && formik.errors.industry}
      >
        {industryOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
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
          {/* <TextField
        fullWidth
        label="Industry"
        id="industry"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.industry}
        error={formik.touched.industry && !!formik.errors.industry}
        helperText={formik.touched.industry && formik.errors.industry}
      /> */}
          <TextField
            fullWidth
            label="Company Description"
            multiline
            rows={10}
            id="description"
            name="description"
            required
            value={companyFormData.description}
            onChange={handleCompanyFormDataChange}
          />
          <FormControl fullWidth>
            <InputLabel id="company-label">Company Size</InputLabel>
            <Select
              labelId="Company Size"
              label="Company Size"
              id="companySize"
              name="companySize"
              required
              onChange={handleCompanyFormDataChange}
              value={companyFormData.companySize}
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
            id="address"
            name="address"
            required
            multiline
            onChange={handleCompanyFormDataChange}
            value={companyFormData.address}
          />
          <TextField
            fullWidth
            label="Company Website"
            multiline
            id="webSite"
            name="webSite"
            required
            value={companyFormData.webSite}
            onChange={handleCompanyFormDataChange}
          />

          <TextField
            fullWidth
            label="Contact Person Name"
            id="contactPersonName"
            name="contactPersonName"
            required
            onChange={handleCompanyFormDataChange}
            value={companyFormData.contactPersonName}
          />
          <TextField
            fullWidth
            label="Registration/License Number"
            id="licenceNumber"
            name="licenceNumber"
            required
            onChange={handleCompanyFormDataChange}
            value={companyFormData.licenceNumber}
          />
          <TextField
            fullWidth
            label="Contact Email"
            id="email"
            name="email"
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleCompanyFormDataChange}
            value={companyFormData.email}
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
            id="phoneNumber"
            name="phoneNumber"
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
            onChange={handleCompanyFormDataChange}
            value={companyFormData.phoneNumber}
          />

          {/* <TextField
            fullWidth
            type="password"
            label="Password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
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
          <FormControlLabel
            required
            control={<Checkbox />}
            label="I have read and agree to the terms"
          /> */}
          {successMsg.companyInfoChangeSuccessMsg && (
            <Typography variant="h7" color="green" align="center">
              {successMsg.companyInfoChangeSuccessMsg}
            </Typography>
          )}
          {errorMsg.companyInfoChangeErrorMsg && (
            <Typography variant="h7" color="red" align="center">
              {errorMsg.companyInfoChangeErrorMsg}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading.isCompanyFormDataSubmitting}
          >
            {isLoading.isCompanyFormDataSubmitting === true
              ? "Please Wait.."
              : "Confirm the Changes"}
          </Button>
        </FormControl>
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default CompanyInfoEditModal;
