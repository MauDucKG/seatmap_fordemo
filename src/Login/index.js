import React from "react";
import { useEffect, useState } from "react";
import Img from "./coffee.png";
import Navbar from "../Shared/NavigationBar";
import { useNavigate } from "react-router-dom";
import ErrorBox from "./ErrorBox";
import InputField from "../Shared/InputField";
import { getUserLogin } from "./LoginBehavior";
import { urlResource } from "../Shared/InternalServices";
import Error from "./ErrorList";

const Login = ({ handleLogin }) => {
  useEffect(() => {
    document.title = "Login";
  });
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [classValidated, setClassValidated] = useState("");

  const handleChangeUsername = (event) => {
    setShowErrorBox(false);
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setShowErrorBox(false);
    setPassword(event.target.value);
  };

  const handleClickBackButton = () => {
    nav("/");
  }
  const handleClickSigninButton = async (e) => {
    e.preventDefault();
    setClassValidated("was-validated");

    if (!username || !password) return;

    let request = {
      username,
      password,
    };

    const user = await getUserLogin(request);
    if (typeof user !== "undefined") {
      localStorage.setItem('fullname', user.fullname)
      localStorage.setItem('avatar', user.image)
      localStorage.setItem('_id', user._id)
      handleLogin()

      nav(`${urlResource.LINK_TO_HOME_PAGE}`);
    } else setShowErrorBox(true);
  };

  return (
    <div className="container">
      <Navbar path={"login"}></Navbar>
      <hr className="mt-2 mb-5"></hr>
      <div className="mt-5">
        <div className={`row justify-content-center ${classValidated}`}>
          <form
            className="col-12 col-md-6 text-center shadow rounded p-4 bg-light"
            onSubmit={handleClickSigninButton}
            id="form-login"
            noValidate
          >
            <img
              src={Img}
              width="70"
              height="70"
              className="border rounded-circle p-1 m-3"
              alt="logo Coffeein"
            />
            <h1 className="h3 mb-3 pb-4 fw-normal">Please sign in</h1>
            <ErrorBox messageError={Error.E001} showErrorBox={showErrorBox} />
            <InputField
              id="username"
              label="Username"
              handleChangeValue={handleChangeUsername}
              isShowError
              messageError={Error.E002}
              required
            />
            <InputField
              id="password"
              label="Password"
              handleChangeValue={handleChangePassword}
              isShowError
              messageError={Error.E003}
              type="password"
              required
            />

            <button className="w-25 btn btn-lg btn-primary mx-5" type="submit">
              Sign in
            </button>
            <button className="w-25 btn btn-lg btn-primary mx-5" type="button" onClick={handleClickBackButton}>
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
