import React from "react"
import './InputField.css'
const InputField = ({id, label, handleChangeValue, isShowError, messageError}) => {
    return (
        <React.Fragment>
            <label htmlFor={id} className='h6'>{label}</label>
            <input id={id} onChange={handleChangeValue} className="form-control w-75"/>
            {isShowError && <div className="message-error">{messageError}</div>}
            {isShowError || <div className="message-error"></div>}
        </React.Fragment>
    )
}

export default InputField