import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Shared/NavigationBar";
import IMG_manageuser from "./manageuser.png";
import IMG_managemap from "./managemap.png";


const Admin = ({handleLogout}) => {
    useEffect(() => {
        document.title = "Admin";
      });
      const nav = useNavigate();

      const natomanageuser = () => {
        nav('/manageuser')
      }
      const natomanagemap = () => {
        nav('/managemap')
      }
  return (
    <>
      <Navbar path="admin" handleLogout={handleLogout}></Navbar>
      <div className="container">
        <hr className="mt-2 mb-5"></hr>
        <h1 className="my-5 mx-2 text-center">Admin center</h1>
        <hr className="my-2 "></hr>
        <div className="row">
          <div className="col-6">
            <div className="card-desk">
              <div className="card">
                <img
                  className="card-img-top"
                  height="300"
                  src={IMG_manageuser}
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Manage User</h5>

                  <p className="card-text">
                    Here you can edit the information about the employee list
                    such as adding, editing, deleting employees.
                  </p>
                  <button className="btn btn-primary" onClick={natomanageuser} >Redirect to Manage User</button>
                </div>
                <div className="card-footer text-muted">
                  Have fun using seatmap
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card-desk">
              <div className="card">
                <img
                  className="card-img-top"
                  src={IMG_managemap}
                  alt=""
                  height="300"
                />
                <div className="card-body">
                  <h5 className="card-title">Manage Map</h5>

                  <p className="card-text">
                    Here you can view and customize the functions of each saved
                    map such as adding tables and chairs, deleting and editing
                    roles, adding employees to positions.
                  </p>
                  <button className="btn btn-primary" onClick={natomanagemap}>Redirect to Manage Map</button>
                </div>
                <div className="card-footer text-muted">
                  Have fun using seatmap
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
