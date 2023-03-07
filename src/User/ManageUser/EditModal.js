import React from "react";
import EditAvatar from "./EditAvatar";
import ERROR from "../AddedUser/ErrorList";
import { listRoles } from "../../Shared/InternalServices";
const EditModal = ({
  i,
  user,
  edit,
  handleChangeFormAvatarData,
  setfullnamechange,
  setrolechange,
}) => {
  return (
    <>
      <div
        className="modal fade"
        id={`Modal${i}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mx-5" id="exampleModalLabel">
                Edit employee
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body form-control">
              <div className="row align-items-center">
                <div className="col-6">
                  <div className="text-center">
                    <EditAvatar
                      handleChangeFormAvatarData={handleChangeFormAvatarData}
                      defaultAvatar={user.image}
                      imgId={`img${i}`}
                    />
                  </div>
                </div>
                <div className="col-5 was-validated">
                  <label htmlFor="exampleDataList" className="form-label h6 mt-2">
                    Full Name
                  </label>
                  <div>
                    <input
                      type="fullname"
                      className="form-control"
                      minLength="5"
                      maxLength="100"
                      id={`fullname${i}`}
                      defaultValue={user.fullname}
                      onChange={(e) => {
                        setfullnamechange(e.target.value.trim());
                      }}
                      required
                    ></input>
                    <div className="invalid-feedback">{ERROR.E001}</div>
                  </div>

                  <label htmlFor="exampleDataList" className="form-label h6 mt-2">
                    Role
                  </label>
                  <div>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      defaultValue={user.role}
                      onChange={(e) => {
                        setrolechange(e.target.value);
                      }}
                      required
                    >
                      {Object.keys(listRoles).map((role) => (
                        <option key={listRoles[role]} value={listRoles[role]}>
                          {role}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="exampleDataList" className="form-label h6 mt-2">
                      Username
                    </label>
                    <input
                      type="username"
                      className="form-control"
                      minLength="5"
                      maxLength="100"
                      id={`fullname${i}`}
                      value={user.username}
                      onChange={(e) => {
                        setfullnamechange(e.target.value.trim());
                      }}
                      disabled={true}
                      readonly={true}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={edit}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditModal;
