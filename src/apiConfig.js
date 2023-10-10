const apiConfig = {
  baseURL: "https://be.jobspace.org.uk/api/v1/",
  auth: {
    login: "Auth/login",
    userRegi: "Auth/user-registration",
    companyRegi: "Auth/company-registration",
    sendVerificationCode: "Auth/send-verification-code",
    passwordReset: "Auth/ResetPassword",
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
    shortListCandidate: "JobPost/shortlistCandidate",
  },
  employee: {
    getInfoByToken: "User/getEmployeeInfo",
    getInfoByID: "User/getEmployeeById",
    updateInfo: "User/updateEmployeeInfo",
    updatePassword: "User/UpdatePassword",
    fetchAllAppliedJob: "User/getAppliedJobs",
    applyToJob: "User/ApplyToJob",
    getJobDetailsByID: "JobPost/fetchJobPostById",
  },
  public: {
    fetchAllJobPosts: "JobPost/fetchJobPosts",
    fetchJobDetailsByID: "JobPost/fetchJobPostById",
  },
  admin: {
    fetchAllCompanyData: "User/getUsersList?userType=Company",
    fetchAllUserData: "User/getUsersList?userType=Employee",
    changeProfileStatus: "User/Update-User-Access",
    fetchAllJobs: "JobPost/fetchJobPostsAsAdmin",
    updateJobApprovalStatus: "JobPost/updateJobApprovalStatus",
  },
};

export default apiConfig;
