import { useParams, useSearchParams } from "react-router-dom";

const User = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mySearchParam = searchParams.get("search");
  const { userID } = useParams();
  return (
    <div>
      <h1>USER - {userID}</h1>
      <h2>search key - {mySearchParam}</h2>
      <button onClick={() => setSearchParams({ search: `new value` })}>
        change search key
      </button>
    </div>
  );
};

export default User;
