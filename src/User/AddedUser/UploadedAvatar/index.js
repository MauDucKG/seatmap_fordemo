import React from "react";
import { useState } from "react";
import './UploadedAvatar.css';
import ERROR from '../ErrorList'
import { DEFAULT_AVATAR_URL } from "../Shared/InternalServices";
const UploadAvatar = ({handleChangeFormAvatarData}) => { 
    const isLessThan5MB = (numByte) => {
      return numByte * Math.pow(2, -20) / 1024 <= 5 
    }
    const apiKey = 115694639632649
    const uploadPreset = "seatmap"
    
    const [avatarBase64, setAvatarBase64] = useState('')
    const [messageError, setMessageError] = useState('')
    const getBase64 = file => {
        return new Promise(resolve => {
          let baseURL = "";
          let reader = new FileReader();
    
          reader.readAsDataURL(file);

          reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
      };
    
    const handleChangeAvatar = event => {
        const file = event.target.files[0]
        if (file.type.split('/')[0] === 'image' && isLessThan5MB(file.size)){
          setMessageError('')
          getBase64(file)
          .then(response => {
              setAvatarBase64(response)
          })
          handleChangeFormAvatarData(file, apiKey, uploadPreset)
        }
        else {
          file.type.split('/')[0] !== 'image' ? setMessageError(ERROR.E006) : setMessageError(ERROR.E007)
        }
    }
    return (
      <React.Fragment>
        {avatarBase64 === '' && <img src={DEFAULT_AVATAR_URL} alt = "Avatar" />}
        {avatarBase64 === '' || <img src={avatarBase64} alt = "Avatar" />}

        {messageError === '' || <p className="text-center text-danger mt-2 mb-0">{messageError}</p>}

        <label htmlFor='file' className="btn btn-primary my-2">Change Avatar</label>
        <input id='file' type='file' onChange={handleChangeAvatar}/>
      </React.Fragment>
    )
}

export default UploadAvatar