import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function ProtectedRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to={{ pathname: "/login" }} />;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
