import React from "react";
import Img from "./coffee.png";
import { useNavigate } from "react-router-dom";
import Logout from "../../Logout";
import {
  urlResource
} from "../InternalServices";
import SettingIcon from "./SettingIcon";

const Navbar = ({ user, path, handleLogout }) => {
  user = {
    fullname: localStorage.getItem("fullname"),
    image: localStorage.getItem("avatar"),
  };
  const nav = useNavigate();
  const enterlogin = () => {
    nav("/login");
  };
  const navtoadmin = () => {
    nav("/");
  };

  if (path === urlResource.LINK_TO_LOGIN_PAGE)
    return (
      <div>
        <nav className="navbar navbar-expand bg-warning shadow rounded">
          <div className="col-1"></div>
          <div className="col-1">
            <img
              src={Img}
              width="50"
              height="50"
              className="border rounded-circle p-1 mx-3"
              alt=""
            ></img>
          </div>
          <h2 className="mx-2 col-2">Login</h2>
        </nav>
      </div>
    );

  if (path === urlResource.LINK_TO_HOME_PAGE)
    return (
      <div className="container">
        <nav className="navbar navbar-expand bg-warning shadow rounded">
          <div className="col-1"></div>
          <div className="col-1">
            <img
              src={Img}
              width="50"
              height="50"
              className="border rounded-circle p-1 mx-3"
              alt=""
            ></img>
          </div>
          <h2 className="mx-2 col-7">Login</h2>
          <button className="btn btn-light col-2" onClick={enterlogin}>
            Login
          </button>
        </nav>
      </div>
    );
  if (path === "admin")
    return (
      <div className="container">
        <nav className="navbar navbar-expand bg-warning shadow rounded">
          <div className="col-1"></div>
          <div className="col-1">
            <img
              src={Img}
              width="50"
              height="50"
              className="border rounded-circle p-1 mx-3"
              alt=""
            ></img>
          </div>

          <h2 className="mx-2 col-2">Admin</h2>
          <div className="col-8 row justify-content-end">
            <div className="col-5 row shadow rounded align-items-center justify-content-center bg-light">
              <div className="col-10">
                <h4 className="my-auto">{user.fullname}</h4>
              </div>
              <div className="col-2">
                <img
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  src={user.image}
                  width="40"
                  height="40"
                  className="border rounded-circle my-auto"
                  alt=""
                ></img>
                <ul
                  className="dropdown-menu"
                  style={{ marginLeft: "78.6%" }}
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Logout handleLogout={handleLogout}></Logout>
                  </li>
                </ul>
              </div>

            </div>
            <SettingIcon></SettingIcon>
          </div>
        </nav>
      </div>
    );
  if (path === urlResource.LINK_TO_MANAGE_USER_PAGE)
    return (
      <div>
        <nav className="navbar navbar-expand bg-warning shadow rounded">
          <div className="col-1"></div>
          <div className="col-1 " onClick={navtoadmin}>
            <img
              src={Img}
              width="50"
              height="50"
              className="border rounded-circle p-1 mx-3 btn"
              alt=""
            ></img>
          </div>

          <h2 className="mx-2 col-2">Manage User</h2>
          <div className="col-8 row justify-content-end">
            <div className="col-5 row shadow rounded align-items-center justify-content-center bg-light">
              <div className="col-10">
                <h4 className="my-auto">{user.fullname}</h4>
              </div>
              <div className="col-2">
                <img
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  src={user.image}
                  width="40"
                  height="40"
                  className="border rounded-circle my-auto"
                  alt=""
                ></img>
                <ul
                  className="dropdown-menu"
                  style={{ marginLeft: "78.6%" }}
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Logout handleLogout={handleLogout}></Logout>
                  </li>
                </ul>
              </div>
            </div>
            <SettingIcon></SettingIcon>
          </div>
        </nav>
      </div>
    );
};
export default Navbar;
