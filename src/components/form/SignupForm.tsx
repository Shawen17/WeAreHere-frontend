import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import states from "../State";
import { signup } from "../../actions/auth";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "./LoginForm";
import { Form } from "reactstrap";
import { Checkbox } from "@mui/material";
import {
  Label,
  Input,
  SearchContainer,
  Button,
  FormDisplay,
  Title,
  Outline,
  MiniContainer,
  Box,
  Select,
} from "../Styled";

const SignupForm: React.FC = (props: any) => {
  type FormInputs = {
    first_name: string;
    last_name: string;
    email: string;
    state: string;
    phone_number: number;
    password: string;
    re_password: string;
  };
  document.title = "sign-up";
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState<FormInputs>({
    first_name: "",
    last_name: "",
    email: "",
    state: "",
    phone_number: 0,
    password: "",
    re_password: "",
  });

  useEffect(() => {
    if (submitted) {
      if (props.failed) {
        setError("Registration Failed, kindly put valid details");
      } else {
        navigate("/signup/verify");
      }
    }
  }, [props.failed, submitted, navigate]);

  const checkSubmit = () => {
    const { first_name, last_name, state, phone_number, email } = inputs;
    return first_name && last_name && clicked && state && phone_number && email;
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setSubmitted(false);
    setError("");

    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const data = new FormData();
    data.append("email", inputs.email);
    data.append("phone_number", inputs.phone_number.toString());
    data.append("first_name", inputs.first_name);
    data.append("last_name", inputs.last_name);
    data.append("state", inputs.state);
    data.append("password", inputs.password);
    data.append("re_password", inputs.re_password);

    const password = inputs.password;
    const re_password = inputs.re_password;
    if (password === re_password) {
      await props.signup(data);
      setSubmitted(true);
    } else {
      setError("password does not match");
    }
  };

  if (props.isAuthenticated) {
    navigate("/account");
  }
  const formDisplay: React.CSSProperties = {
    width: "100%",
  };

  return (
    <Container
      style={{ backgroundColor: "white", borderRadius: 6 }}
      className="page-load"
    >
      <p style={{ color: "red" }}>{error}</p>

      <Title>Register Details</Title>

      <FormDisplay>
        <Form style={formDisplay} onSubmit={handleSubmit}>
          <MiniContainer>
            <Box>
              <Label htmlFor="first_name">First Name</Label>
              <SearchContainer>
                <Input
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  value={inputs.first_name || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="last_name">Last Name</Label>
              <SearchContainer>
                <Input
                  placeholder="
                  Last Name"
                  type="text"
                  name="last_name"
                  value={inputs.last_name || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>

          <Label htmlFor="email">Email</Label>
          <SearchContainer>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </SearchContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="phone_number">Phone Number</Label>
              <SearchContainer>
                <Input
                  placeholder="Phone Number"
                  type="number"
                  name="phone_number"
                  value={inputs.phone_number || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="state">State</Label>
              <SearchContainer>
                <Select
                  className="white-arrow"
                  name="state"
                  value={inputs.state || ""}
                  onChange={handleChange}
                >
                  <option value="others">state</option>
                  {states.map((location: any) => (
                    <option key={location.id} value={location.state}>
                      {location.state}
                    </option>
                  ))}
                </Select>
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="password">Password</Label>
              <SearchContainer>
                <Input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  required
                />
              </SearchContainer>
            </Box>

            <Box>
              <Label htmlFor="re_password">Password Again</Label>
              <SearchContainer>
                <Input
                  placeholder="confirm password"
                  type="password"
                  name="re_password"
                  value={inputs.re_password || ""}
                  onChange={handleChange}
                  required
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <div>
            <Label>
              <Checkbox id="terms" onClick={() => setClicked(!clicked)} />I
              agree with the terms and conditions
            </Label>
          </div>
          <Button type="submit" disabled={!checkSubmit()}>
            Submit
          </Button>
        </Form>
      </FormDisplay>
      <Outline style={{ marginBottom: 20 }}>
        <p style={{ display: "flex" }} className="mt-3">
          <Link className="nav-link" to="/login">
            Already have an account? <span>Login</span>{" "}
          </Link>{" "}
        </p>
      </Outline>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  failed: state.auth.failed,
});

export default connect(mapStateToProps, { signup })(SignupForm);
