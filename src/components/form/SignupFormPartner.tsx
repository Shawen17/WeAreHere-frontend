import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import states from "../State";
import { signup } from "../../actions/auth";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import services from "../Services";
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
  Select,
  Box,
  MiniContainer,
} from "../Styled";

const SignupFormPartner: React.FC = (props: any) => {
  type FormInputs = {
    first_name: string;
    last_name: string;
    email: string;
    state: string;
    business_name: string;
    business_address: string;
    document: File | null;
    phone_number: number;
    status: string;
    service: string;
    password: string;
    re_password: string;
  };
  document.title = "partner signup";
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
    business_name: "",
    business_address: "",
    document: null,
    status: "",
    service: "",
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
    const {
      first_name,
      last_name,
      state,
      phone_number,
      email,
      business_name,
      business_address,
      service,
    } = inputs;
    return (
      first_name &&
      last_name &&
      clicked &&
      state &&
      phone_number &&
      email &&
      business_name &&
      business_address &&
      service
    );
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setInputs({ ...inputs, document: file });
    }
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const data = new FormData();
    data.append("email", inputs.email);
    data.append("phone_number", inputs.phone_number.toString());
    data.append("first_name", inputs.first_name);
    data.append("last_name", inputs.last_name);
    data.append("business_name", inputs.business_name);
    data.append("business_address", inputs.business_address);
    data.append("service", inputs.service);
    data.append("document", inputs.document as File);
    data.append("status", "off");
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
                  placeholder="first name"
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
                  placeholder="last name"
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
              placeholder="email"
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </SearchContainer>

          <Label htmlFor="business_name">Business Name</Label>
          <SearchContainer>
            <Input
              placeholder="business name"
              type="text"
              name="business_name"
              value={inputs.business_name || ""}
              onChange={handleChange}
            />
          </SearchContainer>

          <Label htmlFor="business_address">Business Address</Label>
          <SearchContainer>
            <Input
              placeholder="business address"
              type="text"
              name="business_address"
              value={inputs.business_address || ""}
              onChange={handleChange}
            />
          </SearchContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="phone_number">Phone Number</Label>
              <SearchContainer>
                <Input
                  placeholder="phone number"
                  type="number"
                  name="phone_number"
                  value={inputs.phone_number || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="document">Upload CAC doc</Label>
              <SearchContainer>
                <Input type="file" onChange={handleFileChange} />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="service">Service</Label>
              <SearchContainer>
                <Select
                  name="service"
                  value={inputs.service || ""}
                  onChange={handleChange}
                >
                  <option value="others"></option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </Select>
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="state">State</Label>
              <SearchContainer>
                <Select
                  name="state"
                  value={inputs.state || ""}
                  onChange={handleChange}
                >
                  <option value="others"></option>
                  {states.map((location) => (
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
          <Label htmlFor="status">Subscription Status</Label>
          <SearchContainer>
            <Input
              type="text"
              name="status"
              value="off"
              onChange={handleChange}
              readOnly
            />
          </SearchContainer>
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

export default connect(mapStateToProps, { signup })(SignupFormPartner);
