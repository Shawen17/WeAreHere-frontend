import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  flex: 60%;
  position: relative;
  margin: 0;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 482px) {
    height: 60vh;
    margin-top: 60px;
    ${Wrapper} {
      height: 100%;
    }
  }
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 3px;
  font-family: "Urbanist", sans-serif;
  color: white;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;
const InfoContainer = styled.div`
  flex: 30%;
  height: 25%;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.p`
  color: white;
  font-family: "Urbanist", sans-serif;
  font-weight: bold;
  font-size: 40px;
`;

const Slide = styled.div`
  width: 95vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;

  @media screen and (max-width: 482px) {
    ${Wrapper} {
      height: 50%;
    }
    ${ImgContainer} {
      height: 80%;
    }

    ${Desc} {
      margin: 20px 0px;
      font-size: 12px;
      letter-spacing: 1px;
    }
  }
`;
const Right = styled.div`
  display: flex;
  flex: 40%;
  justity-content: center;
  align-items: center;
  padding: 15px;
  background-color: green;

  @media screen and (max-width: 1045px) {
    flex: 0%;
    display: none;

    ${Wrapper} {
      flex: 100%;
    }
  }
`;

const UpperPage = () => {
  return (
    <Container>
      <Wrapper>
        <Slide className="pic" id="pic4">
          <ImgContainer>
            <Image src="/construction-service1.jpg" alt="slide" />
          </ImgContainer>
          <InfoContainer></InfoContainer>
        </Slide>
        <Slide className="pic" id="pic3">
          <ImgContainer>
            <Image src="/cleaning.jpg" alt="slide" />
          </ImgContainer>
          <InfoContainer></InfoContainer>
        </Slide>
        <Slide className="pic" id="pic2">
          <ImgContainer>
            <Image src="/interior.jpg" alt="slide" />
          </ImgContainer>
          <InfoContainer></InfoContainer>
        </Slide>
        <Slide className="pic" id="pic1">
          <ImgContainer>
            <Image src="/house.jpeg" alt="slide" />
          </ImgContainer>
          <InfoContainer></InfoContainer>
        </Slide>
      </Wrapper>
      <Right>
        <Title>
          For your Construction, Interior, Event, Cleaning and Real Estate
          Services, We are here!{" "}
          <span style={{ color: "#FF8624" }}>Let's Talk</span>
        </Title>
      </Right>
    </Container>
  );
};

export default UpperPage;
