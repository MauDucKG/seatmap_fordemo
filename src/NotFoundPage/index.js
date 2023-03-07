import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NotFoundPage =()=> {
  useEffect(() => {
    document.title = "Login";
  });
  const nav = useNavigate();
  const gohome = () => {
    nav("/");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <button className="btn btn-primary" onClick={gohome}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
export default NotFoundPage;
