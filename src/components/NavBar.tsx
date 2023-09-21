import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";
import NavMenu from "./NavMenu";

const Line = styled.div`
  height: 2px;
  color: white;
  background-color: white;
`;

const Container = styled.div`
  height: 60px;
  background: transparent;
  font-family: "Bricolage Grotesque", sans-serif;
  width: 100vw;
  padding: 0px 15px 0px 15px;

  @media screen and (max-width: 482px) {
    background: whitesmoke;
    color: black;
    ${Line} {
      opacity: 0;
    }
  }
`;

const Wrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Brand = styled.h1`
  font-weight: bold;
  &:hover {
    color: #126180;
  }
`;

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  const toggleModal = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 60,
          position: "fixed",
          zIndex: 9,
          top: 0,
          right: 0,
          left: 0,
        }}
      >
        <Container>
          <Wrapper>
            <Link className="mr-auto nav-link" to="/">
              <Brand>WeAreHere</Brand>
            </Link>
            <div className="navigation-menu">
              <NavMenu />
            </div>
            <div
              className="hamburger"
              style={{ fontSize: 30 }}
              onClick={toggleModal}
            >
              <MenuIcon />
            </div>
          </Wrapper>
        </Container>
        <Line />
        {toggle ? (
          <ClickAwayListener onClickAway={() => setToggle(false)}>
            <div className="menu-appear">
              <div className="no-bullets">
                <NavMenu />
              </div>
            </div>
          </ClickAwayListener>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavBar;
