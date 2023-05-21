import NotFoundGif from '../../assets/404.gif'
import styles from './notFound.module.css'
const NotFound = () => {
  return (
    <div className={styles["notFoundGif-wrapper"]}>
      <img src={NotFoundGif} alt="not-found" />
    </div>
  );
};

export default NotFound;
