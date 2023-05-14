import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/notFound/NotFound";
import Jobs from "./pages/jobs/Jobs";
import Employer from "./pages/employer/Employer";
import User from "./pages/user/User";

const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/employer/:employerID" element={<Employer />} />
      <Route path="/user/:userID" element={<User />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouters;
