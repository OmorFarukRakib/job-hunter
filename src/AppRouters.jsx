import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/notFound/NotFound";
import Jobs from "./pages/jobs/Jobs";
import Job from "./pages/Job/Job";
// import Employer from "./pages/employer/Employer";
import UserPage from "./pages/userPage/UserPage";
import CompanyPage from "./pages/companyPage/CompanyPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import VerifyRegistratiob from "./pages/VerifyRegistration/VerifyRegistration";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verify_registration" element={<VerifyRegistratiob />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/jobs" element={<Jobs />} />

      <Route path="/job/:jobID" element={<Job />} />

      {/* <Route path="/user/:userID" element={<Employer />} /> */}
      <Route path="/company/:compID" element={<CompanyPage />} />
      <Route path="/user/:userID" element={<UserPage />} />
      <Route path="/admin/:adminID" element={<AdminPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouters;
