import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.12);
  padding: 20px 10px 20px 10px;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 4px 3px 3px 3px rgba(0, 31, 26, 0.36);
  margin: 5px;
  padding: 5px;
  border-radius: 6px;
  // height: 80px;
  font-size: 13px;
  width: 100%;
`;

const Service = styled.div`
  background-color: #648c11;
  color: white;
  border-radius: 6px;
  height: 30px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const handleDate = (inputDateString) => {
  if (inputDateString) {
    const inputDate = new Date(inputDateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const outputDateString = inputDate.toLocaleDateString("en-US", options);
    return outputDateString;
  } else {
    return <div className="unsold">pending</div>;
  }
};

const UserAccount = () => {
  const [appointments, setAppointments] = useState({
    items: {
      orders: [
        { id: 0, service: "", address: "", date_booked: "", service_date: "" },
      ],
    },
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        };
        const response = await axios.put(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/appointments/`,
          { email },
          config
        );

        setAppointments({ items: response.data });
      } catch (error) {
        navigate("/login");
      }
    };

    fetchAppointments();
  }, [email, token, navigate]);

  return (
    <Container>
      <h5>Booked Appointment</h5>
      {appointments.items.orders.length > 0 ? (
        appointments.items.orders.map((order) => (
          <Row key={order.id}>
            <div>date_booked: {handleDate(order.date_booked)}</div>
            Service: <Service>{order.service}</Service>
            <div>service_date: {handleDate(order.service_date)}</div>
            <div>address: {order.address}</div>
          </Row>
        ))
      ) : (
        <div>You are yet to enjoy any of our service, we offer the best</div>
      )}
    </Container>
  );
};

export default UserAccount;
