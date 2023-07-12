import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/notFound/NotFound";
import Jobs from "./pages/jobs/Jobs";
import Job from "./pages/Job/Job";
// import Employer from "./pages/employer/Employer";
import UserPage from "./pages/userPage/UserPage";
import CompanyPage from "./pages/companyPage/CompanyPage";
const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/job/:jobID" element={<Job />} />
      {/* <Route path="/user/:userID" element={<Employer />} /> */}
      <Route path="/company/:compID" element={<CompanyPage />} />
      <Route path="/user/:userID" element={<UserPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouters;
