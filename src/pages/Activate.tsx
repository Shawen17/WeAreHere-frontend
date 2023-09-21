import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { verify } from "../actions/auth";

// Define the props for the component
type PropsFromRedux = ConnectedProps<typeof connector>;

const Activate: React.FC<PropsFromRedux> = (props) => {
  const [verified, setVerified] = useState(false);

  const params = useParams<{ uid?: string; token?: string }>();
  const verify_account = (e: FormEvent) => {
    e.preventDefault();
    const uid = params.uid;
    const token = params.token;
    if (uid && token) {
      props.verify(uid, token);
      setVerified(true);
    }
    setVerified(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (verified) {
      navigate("/login");
    }
  }, [verified, navigate]);

  return (
    <div className="container activation-load" style={{ marginTop: "110px" }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Welcome! Verify your account</h1>
        <button
          className="btn btn-primary mt-3"
          onClick={verify_account}
          type="button"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

// Connect your component to Redux
const connector = connect(null, { verify });
export default connector(Activate);
