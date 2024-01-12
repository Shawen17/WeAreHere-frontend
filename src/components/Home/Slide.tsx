import { useState } from "react";
import styled from "styled-components";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ContactForm from "../form/ContactForm";

const TopContainer = styled.div`
  height: 100px;
  background-color: #ff8624;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px 30px 0px 30px;
  flex-wrap: wrap;
`;

const Box = styled.div`
  height: 180px;
  flex: 15%;
  margin-right: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justity-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: none;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 482px) {
    flex: 100%;
    margin: 0px 20px 10px 20px;
    height: 150px;
  }
`;
const Icon = styled.div`
  color: #ff8624;

  padding-top: 25px;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-family: "Urbanist", sans-serif;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: grey;
`;

const Footer = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 100%;

  @media screen and (max-width: 1145px) {
    // color: white;
  }
`;

const SocialIcon = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const Desc = styled.p`
  font-size: 18px;
  font-weight: 500px;
  color: #ff8624;

  @media screen and (max-width: 482px) {
    font-size: 12px;

    ${SocialIcon} {
      color: black;
    }
  }
`;

const Slide = () => {
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      <TopContainer>
        <h4 style={{ textAlign: "center" }}>Do business with us</h4>
        <div>
          <Wrapper>
            <Box>
              <Icon>
                {" "}
                <LocationOnIcon style={{ fontSize: 50 }} />
              </Icon>
              <Title>our main office</Title>
              <Subtitle>court of arbitration, lekki</Subtitle>
            </Box>
            <Box>
              <Icon>
                {" "}
                <PhoneIcon style={{ fontSize: 50 }} />{" "}
              </Icon>
              <Title>contact number</Title>
              <Subtitle>080546729345</Subtitle>
            </Box>
            <Box>
              <Icon>
                <MailIcon style={{ fontSize: 50 }} />
              </Icon>
              <Title>email</Title>
              <Subtitle>contact@wearehere.com.ng</Subtitle>
            </Box>
          </Wrapper>
          <Footer>
            <h1>Get in touch</h1>
            <h4>Be a Partner</h4>
            <button
              style={{
                backgroundColor: "#ff8624",
                color: "white",
                marginBottom: 10,
              }}
              onClick={handleClicked}
            >
              Contact us
            </button>
            {clicked && <ContactForm />}
            <Desc>
              <em>YOU CAN COUNT ON US TO DELIVER TOP NOTCH SERVICE </em>
            </Desc>
            <SocialIcon>
              <FacebookOutlinedIcon style={{ fontSize: 30 }} />
              <TwitterIcon style={{ fontSize: 30 }} />
              <InstagramIcon style={{ fontSize: 30 }} />
            </SocialIcon>
          </Footer>
        </div>
      </TopContainer>
      <div className="topcontainer"></div>
    </div>
  );
};

export default Slide;
