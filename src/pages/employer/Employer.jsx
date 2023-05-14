import { useParams } from "react-router-dom";

const Employer = () => {
  const { employerID } = useParams();
  return (
    <div>
      <h1>Employer {employerID} </h1>
    </div>
  );
};

export default Employer;
