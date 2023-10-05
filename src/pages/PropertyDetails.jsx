import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../components/realEstate/Property.css";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { connect } from "react-redux";
import { BASE_URL } from "../components/Api";
import { useLocation, useNavigate } from "react-router-dom";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { convert } from "../components/realEstate/PropertyModal";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import axios from "axios";
import ReactPlayer from "react-player/lazy";

const Back = styled.div`
  padding-left: 15px;
  cursor: pointer;
  margin-right: auto;
  margin-bottom: 10px;
`;

const MainImage = styled.img`
  height: 400px;
  width: 80%;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const MiniImage = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 4px;
  margin-bottom: 5px;

  &:hover {
    transform: scale(1.1);
    transition: 1s ease-out;
  }
`;

const MainWrapper = styled.div`
  height: 100%;
  width: 60%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MIniWrapper = styled.div`
  width: 40%;
  height: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const VideoWrapper = styled.div`
  height: 400px;
  width: 400px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 0px 15px 10px 15px;
  background-color: rgba(128, 128, 128, 0.1);
  border-radius: 4px;
  margin-bottom: 10px;

  @media screen and (max-width: 468px) {
    ${MIniWrapper} {
      width: 30%;
      padding: 10px;
    }
    ${MainWrapper} {
      width: 70%;
      padding: 60px 20px 60px 20px;
    }
    ${MainImage} {
      height: 270px;
      width: 100%;
    }
    ${MiniImage} {
      height: 80px;
      width: 80px;
    }
    ${VideoWrapper} {
      height: 200px;
      width: 200px;
    }
  }
`;

const Button = styled.div`
  width: 60%;
  height: 40px;
  color: white;
  font-weight: bold;
  display: flex;
  cursor: pointer;
`;
const Left = styled.div`
  flex: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;
const Right = styled.div`
  flex: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #40404f;
  font-weight: bold;
  font-size: 16px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PropertyDetails = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state.property;
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);
  const [sliderData, setSliderData] = useState(property.image1);
  const [error, setError] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [show]);

  useEffect(() => {
    const keysToSearch = [
      "image1",
      "image2",
      "image3",
      "image4",
      "image5",
      "image6",
    ];
    const result = [];

    for (const key in property) {
      if (keysToSearch.some((searchKey) => key.includes(searchKey))) {
        result.push(property[key]);
      }
    }
    setImages(result);
  }, [property]);

  const handleScroll = () => {
    setShow(window.scrollY > 60);
  };

  const handleClick = (index) => {
    const slider = images[index];
    setSliderData(slider);
  };

  const Handleback = () => {
    navigate(-1);
  };
  console.log(property);
  const handleBooking = async () => {
    if (props.isAuthenticated) {
      const data = new FormData();
      data.append("email", props.email);
      data.append("apartment", property.description);
      data.append("location", property.location);
      data.append("state", property.state);
      data.append("agent", property.agent);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        await axios.post(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/realestate-booking/`,
          data,
          config
        );
        navigate("/booking-confirmed");
      } catch (error) {
        setError("something went wrong, try again");
      }
    } else {
      navigate("/login/?next=/properties", { state: "/properties" });
    }
  };

  return (
    <div className="prod-details">
      <Back>
        <ArrowBackOutlinedIcon style={{ fontSize: 23 }} onClick={Handleback} />
      </Back>
      <ImageContainer>
        <MIniWrapper>
          {images.map((item, index) => (
            <MiniImage
              src={`${BASE_URL}${item}`}
              key={index}
              onClick={() => handleClick(index)}
              alt="property"
            />
          ))}
        </MIniWrapper>
        <MainWrapper>
          <MainImage src={`${BASE_URL}${sliderData}`} alt="property" />
          <VideoWrapper>
            <ReactPlayer
              height="100%"
              width="100%"
              url={`${BASE_URL}${property.videofile}`}
              controls
            />
          </VideoWrapper>
        </MainWrapper>
      </ImageContainer>
      <div className="desc" style={{ paddingLeft: 10 }}>
        <p>
          <LocationOnOutlinedIcon style={{ fontSize: 16 }} />{" "}
          {property.location}
        </p>
      </div>
      <p style={{ fontSize: 19, fontWeight: "bold", paddingLeft: 10 }}>
        {property.description}
      </p>
      <p style={{ color: "black", textAlign: "center" }}>{property.details}</p>
      <p>{error}</p>
      <div className="cart">
        <Items>
          Selling
          <p>${convert(property.price)}</p>
        </Items>
        <Button onClick={handleBooking}>
          <Left>
            <ArticleOutlinedIcon />{" "}
            <span style={{ marginLeft: 5, fontSize: 18 }}></span>
          </Left>
          <Right>Book Now</Right>
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      email: state.auth.user.email,
      isAuthenticated: state.auth.isAuthenticated,
    };
  } else {
    return { email: "" };
  }
};

export default connect(mapStateToProps, null)(PropertyDetails);
