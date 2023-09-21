import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { BiSpreadsheet } from "react-icons/bi";
import Messagebox from "./Messagebox";

const Left = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0px 10px 0px 10px;
`;
const Right = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Container = styled.div`
  padding: 20px 20px 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 568px) {
    flex-direction: column;
    ${Left} {
      width: 100%;
    }
    ${Right} {
      width: 100%;
    }
  }
`;

const Middle = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <Left>
        <p id="home-header">What we do</p>

        <h3>Opening Artisans to Opportunities</h3>
        <p className="home-text">
          we are here to offer everyday services you can bank on because we
          guaranty trust and excellent delivery, through our skilled artisans,
          hereby making you get things done from the comfort of your home and
          reviving the blue collar sector by opening them to limitless
          opportunities.
        </p>
        <button className="btn btn-primary" onClick={handleClick}>
          {" "}
          Register as Artisan
        </button>
      </Left>
      <Right>
        <Messagebox
          icon={<BsFillJournalBookmarkFill style={{ fontSize: 25 }} />}
          title="Marketing"
          message="we are here for all needs"
        />
        <Messagebox
          icon={<BiBuildings style={{ fontSize: 25 }} />}
          title="Building"
          message="we deliver your building project especially when you are abroad with binding assurance"
        />
        <Messagebox
          icon={<BiSpreadsheet style={{ fontSize: 25 }} />}
          title="Accountable"
          message="we are well detailed as we carry you along while delivering our service and you can always hold us on our promise "
        />
      </Right>
    </Container>
  );
};

export default Middle;
