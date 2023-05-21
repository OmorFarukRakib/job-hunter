import TextField from "@mui/material/TextField";
import styles from "./jobs.module.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import JobList from "../../components/JobList/JobList";
const Jobs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get("type");
  console.log(queryParamValue);
  const [searchQuery, setSearchQuery] = useState({
    type: searchParams.get("type"),
    place: searchParams.get("place"),
  });

  const searchJobListByQueries = () => {
    navigate(`/jobs?type=${searchQuery.type}&place=${searchQuery.place}`);
  };
  return (
    <div>
      <div className={styles["job-search-wrapper"]}>
        <div className={styles["job-search-field-wrapper"]}>
          <TextField
            id="outlined-basic"
            label="What?"
            value={searchQuery.type}
            placeholder="Job title, Keywords, or Company"
            variant="outlined"
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, type: e.target.value })
            }
            type="search"
          />

          <TextField
            id="filled-basic"
            label="Where?"
            value={searchQuery.where}
            placeholder="City, State, Contry, or Remote"
            variant="outlined"
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, place: e.target.value })
            }
            type="search"
          />
        </div>
        <div className={styles["search-btn-wrapper"]}>
          <Button
            variant="contained"
            onClick={() => searchJobListByQueries()}
            disabled={searchQuery.type && searchQuery.place ? false : true}
          >
            Search
          </Button>
        </div>
      </div>
      <div className={styles["job-list-component-wrapper"]}>
        <JobList />
      </div>
    </div>
  );
};

export default Jobs;
