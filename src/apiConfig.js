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
    updateJobStatus: "JobPost/updateJobStatus",
    fetchJobDetailsByID: "JobPost/fetchJobPostById-private",
    updateJobDetails: "JobPost/updateJobPost",
    getAllApplicantList: "JobPost/getAllAplicantsByJob",
    getShortListedApplicantList: "JobPost/getShortlistedApplicant",
    deleteJobPost: "JobPost/deleteJobPost",
  },
  employee: {
    getInfoByToken: "User/getEmployeeInfo",
    getInfoByID: "User/getEmployeeById",
    updateInfo: "User/updateEmployeeInfo",
    updatePassword: "User/UpdatePassword",
    fetchAllAppliedJob: "User/getAppliedJobs",
  },
};

export default apiConfig;
