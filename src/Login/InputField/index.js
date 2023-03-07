import React from "react";

const InputField = ({
  id,
  label,
  handleChangeValue,
  isShowError,
  messageError,
  required = false,
  type = 'text'
}) => {
  return (
    <div className="form-floating m-4">
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={label}
        required={required}
        onInput={handleChangeValue}
      />
      <label htmlFor={id}>{label}</label>
      {isShowError && <div className="invalid-feedback">{messageError}</div>}
      {isShowError || <div className="invalid-feedback">{messageError}</div>}
    </div>
  );
}

export default InputField