const apiConfig = {
  baseURL: "https://be.jobspace.org.uk/api/v1/",
  auth: {
    login: "Auth/login",
    userRegi: "Auth/user-registration",
    companyRegi: "Auth/company-registration",
    sendVerificationCode: "Auth/send-verification-code",
  },
  company: {
    getInfoByToken: "User/getCompanyInfo",
    getInfoByID: "User/getCompanyById",
    updateInfo: "User/updateCompanyInfo",
    updatePassword: "User/UpdatePassword",
    jobCreateByCompany: "JobPost/addJobPost",
    fetchAllJobsList: "JobPost/fetchJobPostsByCompany",
  },
  employee: {
    getInfoByToken: "User/getEmployeeInfo",
    getInfoByID: "User/getEmployeeById",
  },
};

export default apiConfig;
