import styles from "./globalLoadingModal.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import RiseLoader from "react-spinners/RiseLoader";
function GlobalLoadingModal() {
  return (
    <div className={styles["globalLoading_wrapper"]}>
      <RiseLoader size={30} color="#F8974A" loadding={true} />
      <h3 style={{ color: "#643393" }}>LOADING...</h3>
    </div>
  );
}

export default GlobalLoadingModal;
