import { useState } from "react";
import styled from "styled-components";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import { useNavigate } from "react-router-dom";
import "./Property.css";
// import { BASE_URL } from "../Api";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import CountertopsOutlinedIcon from "@mui/icons-material/CountertopsOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import GarageOutlinedIcon from "@mui/icons-material/GarageOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";

const Icon = styled.div`
  background-color: rgba(128, 128, 128, 0.1);
  height: 20px;
`;

const Facilities = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 13px;
  color: rgb(204, 198, 198);
`;
const FacIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
`;

const Line = styled.div`
  height: 1px;
  color: rgb(204, 198, 198);
  background-color: rgb(204, 198, 198);
  margin-top: 3px;
`;

const Circle = styled.div`
  background-color: rgba(128, 128, 128, 0.1);
  height: 160px;
  width: 100%;
  position: relative;
  border-radius: 4px;
`;
const ProductImg = styled.img`
  height: 100%;
  width: 90%;
  position: absolute;
  bottom: 0;
`;

const ProductContainer = styled.div`
  width: 30%;
  margin: 10px;
  height: 380px;
  font-size: 13px;
  cursor: pointer;

  @media screen and (max-width: 568px) {
    width: 100%;
  }
  @media screen and (min-width: 569px) {
    width: 45%;
  }

  @media screen and (min-width: 1004px) {
    width: 30%;
  }
`;

const Details = styled.div`
  height: 120px;
  width: 100%;
`;

const Circ = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 0.5px solid grey;
`;

const SmallCircle = styled(Circ)`
  width: 20px;
  height: 20px;
  z-index: 20;
  top: ${(prop) => prop.position?.top}px;
  left: ${(prop) => prop.position?.left}px;
  display: ${(prop) => prop.position?.display};
`;

export const convert = (value) => {
  if (value) {
    return value.toLocaleString();
  }
};

const PropertyModal = (props) => {
  const property = props.property;
  const [position, setTestPosition] = useState({
    top: 0,
    left: 0,
    display: "none",
  });
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const handleGrow = (event) => {
    // const x = event.pageX;
    // const y = event.pageY;
    const x = event.clientX - 100;
    const y = event.clientY - 100;
    setTestPosition({ ...position, top: y, left: x, display: "block" });
    setTimeout(() => setTestPosition({ ...position, display: "none" }), 1000);
  };

  const HandleClick = () => {
    window.addEventListener("click", (event) => {
      handleGrow(event);
    });
    setTimeout(
      () => navigate("/property-details", { state: { property } }),
      1100
    );
    return () => window.removeEventListener("click", handleGrow);
  };

  const liked = () => {
    setLike(!like);
  };

  return (
    <ProductContainer>
      <div style={{ textAlign: "right" }}>
        <Icon>
          <FavoriteBorderTwoToneIcon
            className={like ? "likeStyle" : ""}
            onClick={liked}
          />
        </Icon>
      </div>
      <div onClick={HandleClick} className="g">
        <Circle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProductImg
              loading="lazy"
              // src={`${BASE_URL}${property.image1}`}
              src={`https://shawenmedia.s3.eu-north-1.amazonaws.com/media/${property.image1}`}
              alt="property"
            />
          </div>
        </Circle>

        <SmallCircle position={position} className="grow" />

        <Details>
          <div className="desc">
            <p>{property.location}</p>
            <div>{property.description}</div>
            <div className="amt">${convert(property.price)}</div>
            <Line />
          </div>
          <Facilities>
            {property.facility.parlor && (
              <FacIcon>
                <WeekendOutlinedIcon style={{ fontSize: 27 }} />
                {property.facility.parlor}{" "}
              </FacIcon>
            )}
            {property.facility.bedroom && (
              <FacIcon>
                <BedOutlinedIcon style={{ fontSize: 27 }} />
                {property.facility.bedroom}{" "}
              </FacIcon>
            )}
            {property.facility.bathroom && (
              <FacIcon>
                <BathtubOutlinedIcon style={{ fontSize: 27 }} />
                {property.facility.bathroom}{" "}
              </FacIcon>
            )}
            {property.facility.kitchen && (
              <FacIcon>
                <CountertopsOutlinedIcon style={{ fontSize: 27 }} />
                {property.facility.kitchen}{" "}
              </FacIcon>
            )}
            {property.facility.area && (
              <FacIcon>
                <CropOriginalOutlinedIcon style={{ fontSize: 27 }} />
                {property.facility.area}m2{" "}
              </FacIcon>
            )}
            {property.facility.garage && (
              <FacIcon>
                <GarageOutlinedIcon style={{ fontSize: 27 }} />
                {property.facility.garage}{" "}
              </FacIcon>
            )}
            {property.facility.garden && (
              <FacIcon>
                <DeckOutlinedIcon style={{ fontSize: 27 }} />
                {property.facility.garden}{" "}
              </FacIcon>
            )}
            {property.facility.pool && (
              <FacIcon>
                <PoolOutlinedIcon style={{ fontSize: 27 }} />
                {property.facility.pool}{" "}
              </FacIcon>
            )}
          </Facilities>
        </Details>
      </div>
    </ProductContainer>
  );
};

export default PropertyModal;
