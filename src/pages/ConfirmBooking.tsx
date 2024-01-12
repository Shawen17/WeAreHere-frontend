import CheckIcon from "@mui/icons-material/Check";
import { Container } from "../components/form/LoginForm";
import styled from "styled-components";
import { connect } from "react-redux";

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #05e177;
  border-radius: 50%;
`;

const Greetings = styled.h5`
  margin-top: 20px;
`;

const Image = styled.img`
  width: 70%;
  height: 50%;
  margin: 10px;
`;

const ConfirmBooking = (props: any) => {
  function capitalizeLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return (
    <Container style={{ marginTop: 80 }}>
      <Icon>
        <CheckIcon style={{ fontSize: 50, color: "#00BB27" }} />
      </Icon>
      <Greetings>
        Thanks for booking our service {capitalizeLetter(props.firstName)}{" "}
        {capitalizeLetter(props.lastName)}
      </Greetings>
      <h6 className="mt-2">we will contact you very soon</h6>
      <Image src="/deal.jpg" alt="deal" />
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  if (state.auth.user) {
    return {
      firstName: state.auth.user.first_name,
      lastName: state.auth.user.last_name,
    };
  }
};

const connector = connect(mapStateToProps, null);
export default connector(ConfirmBooking);
