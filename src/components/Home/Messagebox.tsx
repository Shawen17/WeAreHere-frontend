import styled from "styled-components";

const MiniContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 30%;
  height: 150px;
  background-color: transparent;
  box-shadow: 4px 3px 3px 3px rgba(0, 31, 26, 0.4);
  border-radius: 6px;
  padding: 5px 3px 2px 3px;
  color: #126180;
  margin: 7px;

  @media screen and (max-width: 568px) {
    width: 100%;
  }
`;

interface Props {
  icon: any;
  title: string;
  message: string;
}

const Messagebox = (props: Props) => {
  return (
    <MiniContainer>
      {props.icon}
      <h6>{props.title}</h6>
      <p style={{ color: "#ff8624", fontSize: "14px" }}>{props.message}</p>
    </MiniContainer>
  );
};

export default Messagebox;
