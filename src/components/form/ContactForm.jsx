import React, { useState } from "react";
import styled from "styled-components";
import {
  Label,
  Input,
  SearchContainer,
  Button,
  FormDisplay,
  Title,
} from "../Styled";
import { Form } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 15px 0px 15px;
  align-items: center;
  justify-content: centre;
  color: #126180;
  width: 100%;
`;

const TextArea = styled.textarea`
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px 10px 10px;
  border-radius: 4px;
  border: 0.5px solid #18a558;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #00b894;
    box-shadow: 0 0 10px #00b894;
  }
`;

const ContactForm = () => {
  const [inputValues, setValues] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...inputValues, [name]: value });
  };

  const HandleSubmit = async () => {
    const data = new FormData();
    data.append("full_name", inputValues.name);
    data.append("email", inputValues.email);
    data.append("message", inputValues.message);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/contact/`,
        data,
        config
      );
      navigate("/home");
    } catch (error) {
      setError("something went wrong");
    }
  };

  return (
    <Container>
      <Title>Contact Us </Title>
      {error && error}
      <FormDisplay>
        <Form onSubmit={HandleSubmit}>
          <Label>
            <label htmlFor="name">Name</label>
          </Label>

          <SearchContainer>
            <Input
              required
              placeholder="full name"
              name="name"
              value={inputValues.name || ""}
              type="text"
              onChange={HandleChange}
            />
          </SearchContainer>
          <Label>
            <label htmlFor="email">Email</label>
          </Label>
          <SearchContainer>
            <Input
              required
              placeholder="email"
              name="email"
              value={inputValues.email || ""}
              type="email"
              onChange={HandleChange}
            />
          </SearchContainer>
          <Label htmlFor="details">Message</Label>
          <TextArea
            required
            name="message"
            value={inputValues.message || ""}
            onChange={HandleChange}
          />

          <Button type="submit">Submit</Button>
        </Form>
      </FormDisplay>
    </Container>
  );
};

export default ContactForm;
