import React, { useState } from "react";
import { Text, Icon, IconTextContainer, Title } from "./Subscription";
import { PaystackButton } from "react-paystack";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { convert } from "./realEstate/PropertyModal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { logout } from "../actions/auth";

const Container = styled.div`
  margin: 0px 20px 20px 20px;
  flex-direction: column;
  padding: 40px 10px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background: rgba(135, 206, 235, 0.3);
`;

const Back = styled.div`
  padding-left: 15px;
  cursor: pointer;
  margin-right: auto;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SubBox = styled.div`
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

  @media screen and (max-width: 568px) {
    width: 100%;
  }
`;

const MakePayment = (props) => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const total = location.state;
  const navigate = useNavigate();

  const Handleback = () => {
    navigate(-1);
  };

  const componentProps = {
    email: props.email,
    amount: total.tariff * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    text: "make payment",
    onSuccess: () => {
      const body = JSON.stringify({
        made_by: props.email,
        amount: total.tariff,
        bundle: total.bundle,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      axios
        .post(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/initiate-payment/`,
          body,
          config
        )
        .then((response) => {
          if (response.status === 201) {
            setError(null);
            alert("Subscription successful!");
            navigate("/admin/real-estate");
          }
          if (response.status === 401) {
            props.logout();
            navigate("/login/?next=/admin/makepayment", {
              state: "/admin/makepayment",
            });
          }
        })
        .catch((error) => {
          setError("Network error occurred, contact admin to verify payment");
        });
    },

    onClose: () => alert("subscribe to keep updating properties"),
  };
  return (
    <div style={{ marginTop: 90 }}>
      <Back>
        <ArrowBackOutlinedIcon style={{ fontSize: 22 }} onClick={Handleback} />
      </Back>
      <Container>
        <SubBox>
          <Title>Payment Due</Title>
          <h3>₦{convert(total.tariff)}</h3>

          <IconTextContainer>
            <Icon />
            <Text>10 uploads</Text>
          </IconTextContainer>

          <IconTextContainer>
            <Icon />
            <Text>limited edits</Text>
          </IconTextContainer>
          <div className="button-con">
            <PaystackButton className="paystack-button" {...componentProps} />
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </SubBox>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      email: state.auth.user.email,
    };
  }
};

const connector = connect(mapStateToProps, { logout });
export default connector(MakePayment);
