import React from "react";
import EditModal from "./EditModal";
import RemoveModal from "./RemoveModal";

const Employee = ({
  user,
  i,
  edit,
  remove,
  handleChangeFormAvatarData,
  set_idchange,
  setimagechange,
  setfullnamechange,
  setrolechange,
}) => {
  return (
    <tr className="">
      <th scope="row">{i + 1}</th>
      <td>
        <img
          src={user.image}
          width="40"
          height="40"
          className="border rounded-circle p-1"
          alt="logo Coffeein"
        />
      </td>
      <td>
        <h4>{user.fullname}</h4>
      </td>
      <td>
        <h4>{user.role.toUpperCase()}</h4>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target={`#Modal${i}`}
          onClick={() => {
            set_idchange(user._id);
            setimagechange(user.image);
            setfullnamechange(user.fullname);
            setrolechange(user.role);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            ></path>
          </svg>
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target={`#Modala${i}`}
          onClick={() => {
            set_idchange(user._id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-person-dash"
            viewBox="0 0 16 16"
          >
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
            <path
              fillRule="evenodd"
              d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
            ></path>
          </svg>
        </button>
      </td>
      <EditModal
        i={i}
        user={user}
        edit={edit}
        remove={remove}
        handleChangeFormAvatarData={handleChangeFormAvatarData}
        setfullnamechange={setfullnamechange}
        setrolechange={setrolechange}
      ></EditModal>
      <RemoveModal
        i={i}
        user={user}
        edit={edit}
        remove={remove}
        handleChangeFormAvatarData={handleChangeFormAvatarData}
        setfullnamechange={setfullnamechange}
        setrolechange={setrolechange}
      ></RemoveModal>
    </tr>
  );
};
export default Employee;
