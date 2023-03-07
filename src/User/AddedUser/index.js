import "./AddedUser.css";
import { useState } from "react";
import InputField from "./InputField";
import UploadAvatar from "./UploadedAvatar";
import Error from "./ErrorList";
import UserAPI from "./AddedUserApi";
import { listRoles } from "./Shared/InternalServices";

const PopupAddEmployee = ({ handleHidePopup }) => {
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [showFullnameError, setShowFullnameError] = useState(false);
  const [showRoleError, setShowRoleError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [formAvatarData, setFormAvatarData] = useState();
  const [serverError, setServerError] = useState("");

  const handleChangeFullname = (event) => {
    let name = event.target.value.trim();
    name = name.replace(/\s+/g, " ");
    setFullname(name);
  };

  const handleChangeRole = (event) => {
    setRole(listRoles[event.target.value]);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeFormAvatarData = (file, apiKey, uploadPreset) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("upload_preset", uploadPreset);
    setFormAvatarData(formData);
  };

  const checkFullname = (fullname) => {
    fullname = fullname.trim();
    fullname = fullname.replace(/\s+/g, " ");
    return fullname.length >= 5 && fullname.length <= 100;
  };

  const checkRole = (role) => {
    return Object.values(listRoles).indexOf(role) >= 0;
  };
  const checkUsername = (username) => {
    return (
      username.length >= 8 &&
      username.length <= 30 &&
      /^(?![_.])[a-zA-Z0-9\-_@'.]+(?<![_.])$/.test(username)
    );
  };
  const checkPassword = (password) => {
    return (
      password.length >= 8 &&
      password.length <= 30 &&
      /^[a-zA-Z0-9]+$/.test(password)
    );
  };

  const handleClickBtnSave = async (event) => {
    if (
      !checkFullname(fullname) ||
      !checkRole(role) ||
      !checkUsername(username) ||
      !checkPassword(password)
    ) {
      setShowFullnameError(!checkFullname(fullname));
      setShowRoleError(!checkRole(role));
      setShowUsernameError(!checkUsername(username));
      setShowPasswordError(!checkPassword(password));
    } else {
      setShowFullnameError(false);
      setShowRoleError(false);
      setShowUsernameError(false);
      setShowPasswordError(false);
      setServerError("");

      event.target.disabled = true;

      let isUsernameExist = await UserAPI.IsUsernameExist({ username });
      if (isUsernameExist) {
        setServerError(Error.E005);
        event.target.disabled = false;
      } else {
        let avatarUrl = await UserAPI.UploadAvatar(formAvatarData);
        UserAPI.CreateUser({
          fullname,
          role,
          username,
          password,
          image: avatarUrl,
        });

        event.target.disabled = false;
        handleHidePopup();
      }
    }
  };

  return (
    <div className="popup-add-employee">
      <div className="container bg-light shadow rounded col-6">
        <div className="popup-add-employee_header">
          <h1 className="my-2">Add new employee</h1>
          <button onClick={handleHidePopup} className="btn mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>

        <div className="popup-add-employee_body my-2">
          <div className="col-1"></div>
          <div className="popup-add-employee_avatar">
            <UploadAvatar
              handleChangeFormAvatarData={handleChangeFormAvatarData}
            />
          </div>
          <div className="popup-add-employee_infomation">
            <form>
              <InputField
                id="fullname"
                label="Full Name (*)"
                handleChangeValue={handleChangeFullname}
                isShowError={showFullnameError}
                messageError={Error.E001}
              />

              <label htmlFor="employee-role" className="h6">Role (*)</label>
              <select
                id="employee-role"
                name="em ployee-role"
                onChange={handleChangeRole}
                className='form-control w-75'
              >
                <option value="">--Choose a role--</option>
                {Object.keys(listRoles).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {showRoleError && (
                <div className="message-error">{Error.E002}</div>
              )}
              {showRoleError || <div className="message-error"></div>}

              <InputField
                id="username"
                label="Username (*)"
                handleChangeValue={handleChangeUsername}
                isShowError={showUsernameError}
                messageError={Error.E003}
              />

              <InputField
                id="password"
                label="Password (*)"
                handleChangeValue={handleChangePassword}
                isShowError={showPasswordError}
                messageError={Error.E004}
              />
            </form>
          </div>
        </div>

        <p className="text-center text-danger my-2">{serverError}</p>
        <div className="popup-add-employee_footer">
          <button className="btn btn-secondary mx-3" onClick={handleHidePopup}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleClickBtnSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default PopupAddEmployee
