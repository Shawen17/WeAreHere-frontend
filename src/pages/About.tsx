import { useEffect } from "react";
import styled from "styled-components";
import "./styles.scss";

export const Header = styled.div`
  margin-top: 60px;
  height: 140px;
  background-color: #126180;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h2`
  color: #0cafff;
  font-weight: bold;
`;
export const Sub = styled.p`
  color: white;
  font-size: 14px;
  font-weight: bold;
  font-family: "Urbanist", sans-serif;
`;

const About = () => {
  useEffect(() => {
    // This effect will run after the component renders
    const parentElements = document.querySelectorAll(".animate-text");
    parentElements.forEach((parent) => {
      if (parent instanceof HTMLElement) {
        const width = parent.children[0].clientWidth + "px";
        parent.style.width = width;
      }
    });
  }, []);
  return (
    <div className="activation-load" style={{ marginTop: 80 }}>
      <Header>
        <Title>WeAreHere Story</Title>
        <Sub>any service you can think of</Sub>
      </Header>
      <div className="body">
        <div className="bg-text-container">
          <div className="animate-text">
            <span className="span">WeAre Here&nbsp;</span>
            <span className="span">WeAre Here&nbsp;</span>
          </div>
          <div className="animate-text left">
            <span className="span">WeAre Here&nbsp;</span>
            <span className="span">WeAre Here&nbsp;</span>
          </div>
        </div>

        <div className="container">
          <div className="col">
            <h1 id="h1">Here For You</h1>
            <p id="p">
              get the best satisfaction without leaving the comfort of your home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
