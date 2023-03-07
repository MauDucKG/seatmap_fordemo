import React from "react";
import { useState } from "react";
const EditAvatar = ({ handleChangeFormAvatarData, defaultAvatar, imgId }) => {
  const apiKey = 115694639632649;
  const uploadPreset = "seatmap";
  const [avatarBase64, setAvatarBase64] = useState("");

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleChangeAvatar = (event) => {
    const file = event.target.files[0];
    getBase64(file).then((response) => {
      setAvatarBase64(response);
    });

    handleChangeFormAvatarData(file, apiKey, uploadPreset);
  };
  return (
    <div className="">
      <div className="container">
        {avatarBase64 === "" && (
          <img
            src={defaultAvatar}
            width="200"
            height="200"
            className="border rounded-circle p-1 m-3"
            alt="defaultAvatar"
          />
        )}
        {avatarBase64 === "" || (
          <img
            src={avatarBase64}
            width="200"
            height="200"
            className="border rounded-circle p-1 m-3"
            alt="avatarBase64"
          />
        )}
        <label htmlFor={`${imgId}`} className="btn btn-primary">
          Change Avatar
        </label>
        <input id={`${imgId}`} type="file" onChange={handleChangeAvatar} className='d-none'/>
      </div>
    </div>
  );
};

export default EditAvatar;
