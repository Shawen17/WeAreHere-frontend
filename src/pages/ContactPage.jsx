import React from "react";
import styled from "styled-components";
import ContactForm from "../components/form/ContactForm";

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 30%;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 70%;
`;

const Image = styled.img`
  display: flex;
  width: 50%;
  height: 50%;
  flex: 1;
`;

const Container = styled.div`
  padding: 90px 20px 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
  border-radius: 8px;
`;

const ContactPage = () => {
  return (
    <div className="ls">
      <Container>
        <Left>
          <Image src="contact_graphics.jpg" alt="contact" />
        </Left>
        <Right>
          <ContactForm style={{ width: "100%" }} />
        </Right>
      </Container>
    </div>
  );
};

export default ContactPage;
