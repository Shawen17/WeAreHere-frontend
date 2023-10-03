import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { convert } from "./realEstate/PropertyModal";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const MiniContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.h2`
  text-align: center;
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 500px;
  border-bottom: 4px solid rgba(135, 206, 235, 0.7);
  margin-bottom: 30px;
`;

export const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 10px 10px 10px;
  width: 30%;
  flex-wrap: wrap;
  margin: 5px;
  background-color: whitesmoke;
  height: 350px;
`;

const Line = styled.div`
  height: 2px;
  color: grey;
  background-color: black;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 180px;
`;

export const Icon = styled(CheckCircleOutlinedIcon)`
  font-size: 13px;
  color: white;
  background-color: rgb(135, 206, 235);
  margin-right: 5px;
  line-height: 13px;
`;

export const Text = styled.span`
  line-height: 13px;
  font-family: "PT Sans", sans-serif;
  font-weight: 400px;
`;

export const Container = styled.div`
  margin: 100px 20px 20px 20px;
  width: 60%;

  flex-direction: column;
  padding: 40px 10px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background: rgba(135, 206, 235, 0.3);

  @media screen and (max-width: 568px) {
    width: 100%;

    ${MiniContainer} {
      flex-wrap: wrap;
    }
    ${SubBox} {
      width: 100%;
    }
  }
`;

const Subscription = (props) => {
  const [data, setData] = useState({ items: { packages: [] } });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/charges/`,
          config
        );
        if (response.status === 200) {
          setData({ items: response.data });
        }
        if (response.status === 401) {
          props.logout();
          navigate("/login/?next=/admin/subscribe", {
            state: "/admin/subscribe",
          });
        }
      } catch (error) {}
    };

    fetchProperties();
  }, [navigate, props]);

  const onSubcribe = useCallback(
    (name) => {
      const choice = data.items.packages.filter((item) => item.name === name);
      if (choice.length > 0) {
        return choice[0].charge;
      }
      return 0;
    },
    [data.items.packages]
  );

  const handleAmount = (tariff, bundle) => {
    const data = { tariff: tariff, bundle: bundle };
    navigate("/admin/makepayment", { state: data });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container>
        <div style={{ width: "50%", textAlign: "center" }}>
          <h4>Pick Your Best Plan</h4>
          <p style={{ fontSize: "12px" }}>
            Pick your desired plan to make you have unhindered access to upload
            and edit properties
          </p>
        </div>

        <MiniContainer>
          <SubBox>
            <Title>Basic</Title>
            <h3>₦{convert(onSubcribe("basic"))}</h3>
            <p>Per month</p>
            <Line />

            <IconTextContainer>
              <Icon />
              <Text>10 uploads</Text>
            </IconTextContainer>

            <IconTextContainer>
              <Icon />
              <Text>limited edits</Text>
            </IconTextContainer>
            <button
              className="button-con paystack-button"
              onClick={() => handleAmount(onSubcribe("basic"), "basic")}
            >
              select plan
            </button>
          </SubBox>
          <SubBox>
            <Title>Standard</Title>
            <h3>₦{convert(onSubcribe("standard"))}</h3>
            <p>Per month</p>
            <Line />
            <IconTextContainer>
              <Icon />
              <Text>20 uploads</Text>
            </IconTextContainer>

            <IconTextContainer>
              <Icon />
              <Text>unlimited edits</Text>
            </IconTextContainer>
            <button
              className="button-con paystack-button"
              onClick={() => handleAmount(onSubcribe("standard"), "standard")}
            >
              select plan
            </button>
          </SubBox>
          <SubBox>
            <Title>Premium</Title>
            <h3>₦{convert(onSubcribe("premium"))}</h3>
            <p>Per month</p>
            <Line />
            <IconTextContainer>
              <Icon />
              <Text>unlimited uploads</Text>
            </IconTextContainer>

            <IconTextContainer>
              <Icon />
              <Text>unlimited edits</Text>
            </IconTextContainer>
            <button
              className="button-con paystack-button"
              onClick={() => handleAmount(onSubcribe("premium"), "premium")}
            >
              select plan
            </button>
          </SubBox>
        </MiniContainer>
      </Container>
    </div>
  );
};

const connector = connect(null, { logout });
export default connector(Subscription);
