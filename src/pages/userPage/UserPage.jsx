import { useParams, useSearchParams } from "react-router-dom";
import UserBody from './UserBody/UserBody'
import UserSidebar from './UserSidebar/UserSidebar'
import styles from './userPage.module.css'
import clsx from "clsx";



const UserPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const mySearchParam = searchParams.get("search");
  // const { userID } = useParams();
  return (
    <div className={clsx(styles['userPage-wrapper'])}>
      <UserSidebar/>
      <UserBody/>
    </div>
  );
};

export default UserPage;
