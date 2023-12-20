import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form } from "reactstrap";
import { connect, ConnectedProps } from "react-redux";
import { login } from "../../actions/auth";
import {
  Label,
  Input,
  SearchContainer,
  Button,
  FormDisplay,
  Title,
  Outline,
} from "../Styled";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 15px 0px 15px;
  align-items: center;
  justify-content: centre;
  color: #126180;

  @media screen and (max-width: 569px) {
    margin: 40px 5px 10px 5px;
  }
`;

type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginForm: React.FC<PropsFromRedux> = ({
  login,
  isAuthenticated,
  loginFailed,
}) => {
  const [inputValues, setValues] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [focus, setFocus] = useState(false);

  const location = useLocation();
  document.title = "login";
  const navigate = useNavigate();
  const next = new URLSearchParams(location.search).get("next");

  useEffect(() => {
    if (isAuthenticated) {
      if (next) {
        navigate(location.state);
      } else {
        navigate("/account");
      }
    }
  }, [isAuthenticated, navigate, location.state, next]);

  const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value.trim() }));
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };
  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = inputValues.email;
    const password = inputValues.password;
    if (email && password) {
      await login(email, password);
    }
  };

  const formDisplay: React.CSSProperties = {
    width: "100%",
  };

  return (
    <Container className="page-load" style={{ marginTop: 80 }}>
      <Title>Welcome! enter your details </Title>
      {loginFailed ? (
        <div style={{ color: "red" }}>email or password incorrect</div>
      ) : (
        ""
      )}
      <FormDisplay>
        <Form style={formDisplay} onSubmit={HandleSubmit}>
          <Label>
            <label htmlFor="email">Email</label>
          </Label>

          <SearchContainer>
            <Input
              placeholder="abc@example.com"
              name="email"
              value={inputValues.email || ""}
              type="email"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={HandleChange}
            />
            <MailOutlineOutlinedIcon className={focus ? "grow" : ""} />
          </SearchContainer>
          <Label>
            <label htmlFor="password">Password</label>
          </Label>
          <SearchContainer>
            <Input
              placeholder="password"
              name="password"
              value={inputValues.password || ""}
              type="password"
              onChange={HandleChange}
            />
            <LockOutlinedIcon />
          </SearchContainer>

          <Button type="submit">Login</Button>
        </Form>
        <Outline>
          <Link className="nav-link" to="/signup">
            New User? <span>Signup</span>
          </Link>

          <p style={{ display: "flex" }} className="mt-3">
            <Link className="nav-link" to="/reset-password">
              Forgot Password? <span>Reset Password</span>
            </Link>
          </p>
        </Outline>
      </FormDisplay>
    </Container>
  );
};

// Connect your component to Redux
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginFailed: state.auth.failed,
});

const connector = connect(mapStateToProps, { login });
export default connector(LoginForm);
