import styled from "styled-components";
import OutboxOutlinedIcon from "@mui/icons-material/OutboxOutlined";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background: radial-gradient(circle at center, cyan, rgb(77, 136, 212), blue),
    100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const AlertMessage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  width: 35%;
  align-items: center;
  justify-content: center;
  padding: 5px 10px 2px 10px;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 100px;
`;

const SignupVerify = () => {
  return (
    <Container>
      <Brand>
        <img
          style={{ height: 60, borderRadius: 20, width: 60 }}
          src="/BeemathLogo.png"
          alt="logo"
        />
        <h2 style={{ color: "white" }}>WeareHere</h2>
      </Brand>

      <AlertMessage>
        <OutboxOutlinedIcon id="act-logo" style={{ height: 60, width: 60 }} />
        <h5>Verify your Email Address</h5>
        <p className="mt-4">
          A verification link as been sent to you, kindly verify your account.
        </p>
      </AlertMessage>
    </Container>
  );
};

export default SignupVerify;
