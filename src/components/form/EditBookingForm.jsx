import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container } from "./LoginForm";
import { useNavigate, useLocation } from "react-router-dom";
import { Checkbox } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  Label,
  Input,
  SearchContainer,
  Button,
  FormDisplay,
  Title,
  MiniContainer,
  Box,
} from "../Styled";
import { Form } from "reactstrap";
import styled from "styled-components";

const Back = styled.div`
  padding-left: 15px;
  cursor: pointer;
  margin-right: auto;
  margin-bottom: 10px;
`;

const EditBookingForm = (props) => {
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({});
  const [meeting, setMeeting] = useState(false);
  const [deal, setDeal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state;

  useEffect(() => {
    setMeeting(property.is_meeting_scheduled === "scheduled");
    setDeal(property.agreement_made === "deal");
  }, [property]);

  const handleClicked = (value) => {
    if (value === "meeting") {
      setMeeting(!meeting);
    } else {
      setDeal(!deal);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    const date = inputs.date;
    data.append("date", date);
    data.append("id", property.id);
    data.append("meeting", meeting);
    data.append("deal", deal);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    if (props.status === "on") {
      try {
        await axios.put(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/realestate-booking/`,
          data,
          config
        );
        navigate("/admin/real-estate");
      } catch (error) {
        navigate("/login/?next=/admin/real-estate");
      }
    } else {
      setError("your subscription has expired");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const Handleback = () => {
    navigate(-1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const formDisplay = {
    width: "100%",
  };
  return (
    <Container style={{ marginTop: 80 }}>
      <Title style={{ marginBottom: 10 }}>Update Booking</Title>
      <Back>
        <ArrowBackOutlinedIcon style={{ fontSize: 23 }} onClick={Handleback} />
      </Back>
      {error && error}

      <FormDisplay>
        <Form style={formDisplay} onSubmit={handleSubmit}>
          <MiniContainer className="mb-3">
            <Box>
              <Label htmlFor="email">Customer Email</Label>
              <SearchContainer>
                <Input
                  type="text"
                  name="email"
                  value={property.customer_email}
                  readOnly
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="number">Customer Number</Label>
              <SearchContainer>
                <Input
                  type="text"
                  name="number"
                  value={property.customer_phone}
                  readOnly
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer className="mb-3">
            <Box>
              <Label htmlFor="apartment">Apartment</Label>
              <SearchContainer>
                <Input
                  type="text"
                  name="apartment"
                  value={property.apartment}
                  readOnly
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="inspection">Inspection Date</Label>
              <SearchContainer>
                <Input
                  placeholder="Inspection date"
                  type="date"
                  name="date"
                  value={inputs.date || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>

          <Label htmlFor="location">Location</Label>
          <SearchContainer className="mb-3">
            <Input
              type="text"
              name="location"
              value={property.location}
              readOnly
            />
          </SearchContainer>

          <Label className="mb-3">
            <Checkbox
              checked={meeting}
              onChange={() => handleClicked("meeting")}
            />
            Meeting Scheduled?
          </Label>
          <Label>
            <Checkbox checked={deal} onChange={() => handleClicked("deal")} />
            Agreement Reached?
          </Label>

          <Button onClick={handleSubmit}>Update</Button>
        </Form>
      </FormDisplay>
    </Container>
  );
};

const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      email: state.auth.user.email,
      status: state.auth.user.client_status,
    };
  } else {
    return {
      email: "",
      status: "",
    };
  }
};

export default connect(mapStateToProps, null)(EditBookingForm);
