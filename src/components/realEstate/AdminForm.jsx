import { useState } from "react";
import states from "../State";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "../form/LoginForm";
import { Form } from "reactstrap";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import CountertopsOutlinedIcon from "@mui/icons-material/CountertopsOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import GarageOutlinedIcon from "@mui/icons-material/GarageOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
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
  Select,
} from "../Styled";
import styled from "styled-components";
import axios from "axios";

const TextArea = styled.textarea`
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px 10px 10px;
  border-radius: 4px;
  width: 100%;

  &:focus {
    border: 2px solid #126180;
    color: #126180;
  }
`;

const Back = styled.div`
  padding-left: 15px;
  cursor: pointer;
  margin-right: auto;
  margin-bottom: 10px;
`;

const AdminForm = (props) => {
  document.title = "add-property";
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({});
  const [added, setAdded] = useState(false);

  const Handleback = () => {
    navigate(-1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const mergeFacility = (obj) => {
    const keysToSearch = [
      "bathroom",
      "pool",
      "bedroom",
      "area",
      "parlor",
      "garden",
      "garage",
      "kitchen",
    ];
    const result = {};

    for (const key in obj) {
      if (keysToSearch.some((searchKey) => key.includes(searchKey))) {
        result[key] = obj[key];
      }
    }

    return result;
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const { name, files } = e.target;

      setInputs({ ...inputs, [name]: files[0] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAdded(false);
    const facility = mergeFacility(inputs);

    const data = new FormData();

    data.append("videofile", inputs.videofile);
    data.append("image1", inputs.file1);
    data.append("image2", inputs.file2);
    data.append("image3", inputs.file3);
    data.append("image4", inputs.file4);
    data.append("image5", inputs.file5);
    data.append("image6", inputs.file6);
    data.append("email", props.email);
    data.append("price", inputs.price);
    data.append("category", inputs.category);
    data.append("description", inputs.description);
    data.append("location", inputs.location);
    data.append("state", inputs.state);
    data.append("details", inputs.details);
    data.append("facility", JSON.stringify(facility));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    if (props.status === "on") {
      try {
        await axios.post(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/add-property/`,
          data,
          config
        );

        setAdded(true);
        setInputs({});
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        navigate("/login/?next=/admin/add");
      }
    } else {
      setError("your subscription has expired");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const formDisplay = {
    width: "100%",
  };

  return (
    <Container
      style={{ backgroundColor: "white", borderRadius: 6, marginTop: 80 }}
      className="page-load"
    >
      <Title style={{ marginBottom: 10 }}>Add New Property</Title>
      <Back>
        <ArrowBackOutlinedIcon style={{ fontSize: 22 }} onClick={Handleback} />
      </Back>

      {added && <h5>Property added successfully!</h5>}
      <h5>{error}</h5>
      <FormDisplay>
        <Form style={formDisplay} onSubmit={handleSubmit}>
          <MiniContainer>
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
                  {states.map((location) => (
                    <option key={location.id} value={location.state}>
                      {location.state}
                    </option>
                  ))}
                </Select>
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="description">Description</Label>
              <SearchContainer>
                <Input
                  placeholder="description"
                  type="text"
                  name="description"
                  value={inputs.description || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="email">Email</Label>
              <SearchContainer>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={props.email ? props.email : ""}
                  onChange={handleChange}
                  readOnly
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="category">Category</Label>
              <SearchContainer>
                <Select
                  className="white-arrow"
                  name="category"
                  value={inputs.category || ""}
                  onChange={handleChange}
                >
                  <option value="others">Choose Category</option>
                  <option value="Building">Building</option>
                  <option value="Apartment">Apartment</option>
                </Select>
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="price">Price</Label>
              <SearchContainer>
                <Input
                  placeholder="price"
                  type="number"
                  name="price"
                  value={inputs.price || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="location">Location</Label>
              <SearchContainer>
                <Input
                  placeholder="precise location"
                  type="text"
                  name="location"
                  value={inputs.location || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <Label htmlFor="details">Details</Label>
          <TextArea
            placeholder="property details"
            name="details"
            value={inputs.details || ""}
            onChange={handleChange}
          />
          <Label htmlFor="facilities">Facilities</Label>
          <MiniContainer>
            <Box>
              <Label htmlFor="bedroom">
                <BedOutlinedIcon style={{ fontSize: 22 }} />{" "}
              </Label>
              <SearchContainer>
                <Input
                  placeholder="bedroom total"
                  type="number"
                  name="bedroom"
                  value={inputs.bedroom || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="parlor">
                <WeekendOutlinedIcon style={{ fontSize: 22 }} />
              </Label>
              <SearchContainer>
                <Input
                  placeholder="living room total"
                  type="number"
                  name="parlor"
                  value={inputs.parlor || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="kitchen">
                <CountertopsOutlinedIcon style={{ fontSize: 22 }} />{" "}
              </Label>
              <SearchContainer>
                <Input
                  placeholder="kitchen total"
                  type="number"
                  name="kitchen"
                  value={inputs.kitchen || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="bathroom">
                {" "}
                <BathtubOutlinedIcon style={{ fontSize: 22 }} />
              </Label>
              <SearchContainer>
                <Input
                  placeholder="bathroom total"
                  type="number"
                  name="bathroom"
                  value={inputs.bathroom || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="garden">
                <DeckOutlinedIcon style={{ fontSize: 22 }} />{" "}
              </Label>
              <SearchContainer>
                <Input
                  placeholder="garden"
                  type="number"
                  name="garden"
                  value={inputs.garden || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="garage">
                {" "}
                <GarageOutlinedIcon style={{ fontSize: 22 }} />
              </Label>
              <SearchContainer>
                <Input
                  placeholder="number of cars"
                  type="number"
                  name="garage"
                  value={inputs.garage || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <Label htmlFor="pool">
                {" "}
                pool <PoolOutlinedIcon style={{ fontSize: 22 }} />{" "}
              </Label>
              <SearchContainer>
                <Input
                  placeholder="pool"
                  type="number"
                  name="pool"
                  value={inputs.pool || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
            <Box>
              <Label htmlFor="area">
                {" "}
                <CropOriginalOutlinedIcon style={{ fontSize: 22 }} />
              </Label>
              <SearchContainer>
                <Input
                  placeholder="land size(sqm)"
                  type="text"
                  name="area"
                  value={inputs.area || ""}
                  onChange={handleChange}
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <Label htmlFor="videofile">Videofile</Label>
          <SearchContainer>
            <Input
              type="file"
              name="videofile"
              accept="video/mp4"
              onChange={handleFileChange}
              required
            />
          </SearchContainer>
          <Label htmlFor="images">Images</Label>
          <MiniContainer>
            <Box>
              <SearchContainer>
                <Input
                  type="file"
                  name="file1"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  required
                />
              </SearchContainer>
            </Box>

            <Box>
              <SearchContainer>
                <Input
                  type="file"
                  name="file2"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  required
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <SearchContainer>
                <Input
                  type="file"
                  name="file3"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  required
                />
              </SearchContainer>
            </Box>
            <Box>
              <SearchContainer>
                <Input
                  type="file"
                  name="file4"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  required
                />
              </SearchContainer>
            </Box>
          </MiniContainer>
          <MiniContainer>
            <Box>
              <SearchContainer>
                <Input
                  type="file"
                  name="file5"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  required
                />
              </SearchContainer>
            </Box>
            <Box>
              <SearchContainer>
                <Input
                  type="file"
                  name="file6"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  required
                />
              </SearchContainer>
            </Box>
          </MiniContainer>

          <Button onClick={handleSubmit}>Add Property</Button>
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

export default connect(mapStateToProps, null)(AdminForm);
