import { useNavigate } from "react-router-dom";
import { deleteUserToken } from "./LogoutBehavior";

const Logout = ({ handleLogout }) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav("/");
    deleteUserToken({ '_id': localStorage.getItem('_id') });
    localStorage.clear();
    handleLogout();
  };

  return (
    <>
      <p
        className="btn dropdown-item btn-outline-info dropdown-item"
        onClick={handleClick}
      >
        Log out
      </p>
    </>
  );
}

export default Logout;
