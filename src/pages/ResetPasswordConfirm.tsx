import React, { useState, FormEvent, ChangeEvent } from "react";
import { Input, Form } from "reactstrap";
import { password_reset_confirm } from "../actions/auth";
import { useNavigate, useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

// Define the props for the component
type PropsFromRedux = ConnectedProps<typeof connector>;

const ResetPasswordConfirm: React.FC<PropsFromRedux> = ({
  password_reset_confirm,
}) => {
  const [inputs, setInputs] = useState<{
    password?: string;
    re_password?: string;
  }>({});
  const [requestSent, setRequestSent] = useState(false);

  const handleEventChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const params = useParams<{ uid: string; token: string }>();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const new_password = inputs.password;
    const re_new_password = inputs.re_password;
    const uid = params.uid;
    const token = params.token;
    if (uid && token && new_password && re_new_password) {
      password_reset_confirm(uid, token, new_password, re_new_password);
      setRequestSent(true);
    }
  };

  const navigate = useNavigate();
  if (requestSent) {
    navigate("/");
    return null;
  }

  return (
    <div className="container" style={{ marginTop: "110px" }}>
      <h2>Password reset confirm</h2>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Input
          className="mt-3"
          placeholder="new password.."
          type="password"
          name="password"
          value={inputs.password || ""}
          onChange={handleEventChange}
          required
        />
        <Input
          className="mt-3"
          placeholder="confirm new password.."
          type="password"
          name="re_password"
          value={inputs.re_password || ""}
          onChange={handleEventChange}
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
const connector = connect(null, { password_reset_confirm });
export default connector(ResetPasswordConfirm);
