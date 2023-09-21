import React, { useState, FormEvent, ChangeEvent } from "react";
import { Input, Form } from "reactstrap";
import { reset_password } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

// Define the props for the component
type PropsFromRedux = ConnectedProps<typeof connector>;

const ResetPassword: React.FC<PropsFromRedux> = ({ reset_password }) => {
  const [input, setInput] = useState<string>("");
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    reset_password(input);
    setRequestSent(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const navigate = useNavigate();
  if (requestSent) {
    navigate("/password/reset/confirm/:uid/:token");
    return null;
  }

  return (
    <div className="container" style={{ marginTop: "110px" }}>
      <h2>Request Password Reset</h2>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={input}
          onChange={handleInputChange}
          required
        />
        <button className="btn btn-primary mt-3" type="submit">
          Reset Password
        </button>
      </Form>
    </div>
  );
};

// Connect your component to Redux
const connector = connect(null, { reset_password });
export default connector(ResetPassword);
