import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container } from "./LoginForm";
import states from "../State";
import {
  Label,
  FormDisplay,
  Button as Submit,
  Select,
  Input as InputSyled,
} from "../Styled";
import { Form } from "reactstrap";
import CarpenterOutlinedIcon from "@mui/icons-material/CarpenterOutlined";
import LightOutlinedIcon from "@mui/icons-material/LightOutlined";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import FireTruckOutlinedIcon from "@mui/icons-material/FireTruckOutlined";
import ImagesearchRollerOutlinedIcon from "@mui/icons-material/ImagesearchRollerOutlined";
import PlumbingOutlinedIcon from "@mui/icons-material/PlumbingOutlined";
import FoundationOutlinedIcon from "@mui/icons-material/FoundationOutlined";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { makeBooking } from "../../actions/auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const TextArea = styled.textarea`
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px 10px 10px;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #00b894;
    box-shadow: 0 0 10px #00b894;
  }
`;

const Desc = styled.div`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 13px;
`;

interface Inputs {
  date?: Date;
  address?: string;
  state?: string;
}

const OrderForm = (props: any) => {
  const location = useLocation();
  const [inputs, setInput] = useState<Inputs>({});
  const title = location.state;
  const [service, setService] = useState<string>(title);

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const isDate = /^\d{4}-\d{2}-\d{2}$/.test(value);
    const processedValue = isDate ? new Date(value) : value;
    setInput({ ...inputs, [name]: processedValue });
  };

  const handleButton = (value: string) => {
    setService(value);
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (inputs.address && inputs.date && inputs.state) {
      var address = inputs.address;
      var state = inputs.state;
      var date = inputs.date.toISOString().split("T")[0];
      props.makeBooking(email, address, state, date, service);
      navigate("/booking-confirmed");
    }
  };

  return (
    <Container style={{ backgroundColor: "black", marginTop: 80 }}>
      <FormDisplay style={{ borderRadius: "4px" }}>
        <h5>Make booking for {service} service</h5>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="service">Service</Label>
          <div className="scroll-container">
            <div className="gridscroll">
              <Button
                onClick={() => handleButton("construction")}
                variant="primary"
                className={service === "construction" ? "active" : ""}
              >
                <FoundationOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Construction</Desc>
              </Button>
              <Button
                onClick={() => handleButton("event planning")}
                variant="primary"
                className={service === "event planning" ? "active" : ""}
              >
                <LiquorOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Events</Desc>
              </Button>

              <Button
                onClick={() => handleButton("plumbing")}
                variant="primary"
                className={service === "plumbing" ? "active" : ""}
              >
                <PlumbingOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Plumbing</Desc>
              </Button>
              <Button
                onClick={() => handleButton("tiling")}
                variant="primary"
                className={service === "tiling" ? "active" : ""}
              >
                <GridViewOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Tiling</Desc>
              </Button>
              <Button
                onClick={() => handleButton("interior")}
                variant="primary"
                className={service === "interior" ? "active" : ""}
              >
                <LightOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Interior decor</Desc>
              </Button>
              <Button
                onClick={() => handleButton("cleaning")}
                variant="primary"
                className={service === "cleaning" ? "active" : ""}
              >
                <CleaningServicesOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Cleaning</Desc>
              </Button>

              <Button
                onClick={() => handleButton("painting")}
                variant="primary"
                className={service === "painting" ? "active" : ""}
              >
                <ImagesearchRollerOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Painting</Desc>
              </Button>
              <Button
                onClick={() => handleButton("upholstery")}
                variant="primary"
                className={service === "upholstery" ? "active" : ""}
              >
                <CarpenterOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Upholstery</Desc>
              </Button>

              <Button
                onClick={() => handleButton("evacuation")}
                variant="primary"
                className={service === "evacuation" ? "active" : ""}
              >
                <FireTruckOutlinedIcon style={{ fontSize: 20 }} />
                <Desc>Evacuation</Desc>
              </Button>
            </div>
          </div>
          <Label style={{ marginTop: 10 }} htmlFor="address">
            Address
          </Label>
          <TextArea
            required
            onChange={handleChange}
            name="address"
            value={inputs.address || ""}
          />
          <Label style={{ marginTop: 10 }} htmlFor="state">
            State
          </Label>
          <Select
            className="white-arrow"
            name="state"
            value={inputs.state || ""}
            onChange={handleChange}
          >
            <option value="others">state</option>
            {states.map((location) => (
              <option key={location.id} value={location.state}>
                {location.state}
              </option>
            ))}
          </Select>
          <Label style={{ marginTop: 10 }} htmlFor="date">
            Date
          </Label>
          <InputSyled
            required
            className="white-arrow"
            type="date"
            name="date"
            value={inputs.date ? inputs.date.toISOString().split("T")[0] : ""}
            onChange={handleChange}
          />
          <Submit type="submit">Book Now</Submit>
        </Form>
      </FormDisplay>
    </Container>
  );
};

export default connect(null, { makeBooking })(OrderForm);
