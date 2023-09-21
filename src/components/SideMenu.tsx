import React, { useState } from "react";
import styled from "styled-components";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import FoundationOutlinedIcon from "@mui/icons-material/FoundationOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LightOutlinedIcon from "@mui/icons-material/LightOutlined";
import FireTruckOutlinedIcon from "@mui/icons-material/FireTruckOutlined";
import ImagesearchRollerOutlinedIcon from "@mui/icons-material/ImagesearchRollerOutlined";
import PlumbingOutlinedIcon from "@mui/icons-material/PlumbingOutlined";
import CarpenterOutlinedIcon from "@mui/icons-material/CarpenterOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaidIcon from "@mui/icons-material/Paid";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useNavigate } from "react-router-dom";

const Line = styled.div`
  height: 1px;
  width: 200px;
  color: white;
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.54);
    color: #126180;
    border-radius: 6px;
    transform: scale(1.2);
    transition: 1s ease-out;
  }
`;

const Tp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  font-family: "Bricolage Grotesque", sans-serif;
`;

const Info = styled.div`
  margin-left: 20px;
  font-size: 13px;
  font-family: "Bricolage Grotesque", sans-serif;
`;

const Container = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 10px 20px 10px;
  border-radius: 8px;
  margin: 10px;
  background: rgba(0, 0, 0, 0.12);

  @media screen and (max-width: 482px) {
    padding: 20px 5px 20px 5px;
    width: 150px;
    margin: 5px;
    ${Top} {
      width: 130px;
    }
    ${Tp} {
      width: 130px;
    }
    ${Line} {
      width: 120px;
    }
  }
`;

const SideMenu = () => {
  const [mode, setMode] = useState<any>("light");
  const navigate = useNavigate();
  const handlechange = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#01579b",
      },
      secondary: {
        main: "#E0C2FF",
        light: "#F5EBFF",

        contrastText: "#47008F",
      },
      mode: mode,
    },
  });

  const gotoRealEstate = () => {
    navigate("/real-estate");
  };

  const handleClick = (service: string) => {
    navigate("/booking", { state: service });
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Tp style={{ marginTop: 20 }}>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked onClick={handlechange} />}
              label="change theme"
            />
          </FormGroup>
        </Tp>

        <Tp className="mt-2">Category</Tp>
        <Line className="mt-2" />
        <Top className="mt-4" onClick={() => handleClick("cleaning")}>
          <CleaningServicesOutlinedIcon />
          <Info>Cleaning</Info>
        </Top>
        <Top className="mt-4" onClick={() => handleClick("construction")}>
          <FoundationOutlinedIcon />
          <Info>Construction</Info>
        </Top>
        <Top className="mt-4" onClick={gotoRealEstate}>
          <ApartmentOutlinedIcon />
          <Info>Real Estate</Info>
        </Top>
        <Top className="mt-4" onClick={() => handleClick("interior")}>
          <LightOutlinedIcon />
          <Info>Interiror Decor</Info>
        </Top>
        <Top className="mt-4" onClick={() => handleClick("event planning")}>
          <LiquorOutlinedIcon />
          <Info>Event Planner</Info>
        </Top>
        <Top className="mt-4" onClick={() => handleClick("evacuation")}>
          <FireTruckOutlinedIcon />
          <Info>Evacuation Service</Info>
        </Top>
        <Top className="mt-4" onClick={() => handleClick("painting")}>
          <ImagesearchRollerOutlinedIcon />
          <Info>Painting</Info>
        </Top>
        <Top className="mt-4" onClick={() => handleClick("plumbing")}>
          <PlumbingOutlinedIcon />
          <Info>Plumbing Service</Info>
        </Top>
        <Top className="mt-4" onClick={() => handleClick("upholstery")}>
          <CarpenterOutlinedIcon />
          <Info>Upholstery</Info>
        </Top>
        <Top className="mt-4" onClick={() => handleClick("tiling")}>
          <GridViewOutlinedIcon />
          <Info>Tiling</Info>
        </Top>

        <Tp className="mt-4">TRANSACTIONS</Tp>
        <Line className="mt-2" />
        <Top className="mt-4">
          <ReceiptIcon />
          <Info>Orders</Info>
        </Top>
        <Top className="mt-4">
          <PaidIcon />
          <Info>Total Spent</Info>
        </Top>
        <Top className="mt-4">
          <LocalOfferIcon />
          <Info>Promotions</Info>
        </Top>
      </ThemeProvider>
    </Container>
  );
};

export default SideMenu;
