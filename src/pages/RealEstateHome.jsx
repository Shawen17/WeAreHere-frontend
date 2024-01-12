import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/form/LoginForm";
import styled from "styled-components";
import { Select } from "../components/Styled";
import SearchIcon from "@mui/icons-material/Search";
import states from "../components/State";
import TopProperties from "../components/realEstate/TopProperties";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { connect } from "react-redux";

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
`;

const Button = styled.button`
  flex: 10%;
  height: 35px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #0eb3f4;

  cursor: pointer;
  &:hover {
    background-color: #126180;
  }
`;
const SearchContainer = styled.div`
  margin-bottom: 5px;
  border: 0.5px solid black;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 30px;
  flex: 25%;
  margin: 10px;

  @media screen and (max-width: 568px) {
    flex: 100%;
  }
`;

const Left = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 50%;
  flex-wrap: wrap;
  font-size: 40px;
  font-weight: bold;

  @media screen and (max-width: 568px) {
    flex: 100%;
  }
`;

const Right = styled.div`
  display: flex;
  flex: 50%;
`;

const Admin = styled.button`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-left: auto;
  border-radius: 6px;
  background-color: #0eb3f4;
  color: white;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background-color: #126180;
  }
`;

const PropertyHead = styled.div`
  color: black;
  display: flex;
  font-weight: bold;
  justify-content: flex-start;
  font-size: 30px;
  width: 21%;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const How = styled.div`
  width: 24%;
  height: 100%;
  border-right: 1px solid rgb(204, 198, 198);
  margin: 5px;
`;

const Procedure = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FilterArea = styled.div`
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  width: 80%;
  margin-top: 20px;
  padding: 0px 20px 0px 20px;

  @media screen and (max-width: 568px) {
    padding: 0px 5px 0px 5px;
    width: 90%;
    height: 80px;
  }
`;

const Property = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px 70px 40px 70px;
  flex-wrap: wrap;

  @media screen and (max-width: 568px) {
    margin: 0px 5px 10px 5px;

    ${PropertyHead} {
      width: 100%;
    }

    ${How} {
      width: 100%;
      border-bottom: 1px solid rgb(204, 198, 198);
      border-right: 0px;
    }
    ${Procedure} {
      flex-direction: column;
    }
  }
`;

const RealEstateHome = (props) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  document.title = "real-estate";
  const handleSubmit = () => {
    navigate("/properties");
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (inputs) {
      navigate("/properties", { state: inputs });
    } else {
      navigate("/properties");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div>
      <Container style={{ marginTop: 90 }}>
        {props.admin === "real estate" && (
          <Admin>
            <Link to="/admin/real-estate" className="nav-item nav-link">
              Goto Admin
            </Link>
          </Admin>
        )}
        <div className="slide">
          <Title>
            <Left>Buy Properties with no commission</Left>
            <Right />
          </Title>
          <FilterArea>
            <SearchContainer>
              <Select
                name="state"
                value={inputs.state || ""}
                onChange={handleChange}
              >
                <option value="others">Choose State</option>
                {states.map((location) => (
                  <option key={location.id} value={location.state}>
                    {location.state}
                  </option>
                ))}
              </Select>
            </SearchContainer>
            <SearchContainer>
              <Select
                name="category"
                value={inputs.category || ""}
                onChange={handleChange}
              >
                <option value="">Choose Category</option>
                <option value="Apartment">Apartment</option>
                <option value="Building">Building</option>
              </Select>
            </SearchContainer>

            <Button onClick={handleFilter}>
              Search <SearchIcon style={{ marginLeft: 5 }} />
            </Button>
          </FilterArea>
        </div>
      </Container>
      <Property>
        <PropertyHead>Our choice of popular real estate</PropertyHead>
        <TopProperties />
        <div className="button-con">
          <Button
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "transparent",
              color: "#0eb3f4",
              textTransform: "uppercase",
              fontSize: "22px",
            }}
            onClick={handleSubmit}
          >
            See More
          </Button>
        </div>

        <PropertyHead style={{ marginTop: 100 }}>
          How it works? Find your perfect home
        </PropertyHead>

        <Procedure>
          <How>
            <AddHomeWorkOutlinedIcon style={{ fontSize: 50 }} />
            <h4>Find real estate</h4>
            <p>
              search for any home of your choice, click on them to view all
              details and facilities, then book for inspection.
            </p>
          </How>
          <How>
            <HomeWorkOutlinedIcon style={{ fontSize: 50 }} />
            <h4>Meet Realtor</h4>
            <p>
              go on property inspection to see where you are about to make your
              home and ask questions to clear your doubts.
            </p>
          </How>
          <How>
            <ArticleOutlinedIcon style={{ fontSize: 50 }} />
            <h4>Documentation</h4>
            <p>
              After a satisfactory inspection, it is time to make a binidng
              committment by signing the neccessary contract documents.
            </p>
          </How>
          <How style={{ borderRight: 0, margin: 0, borderBottom: 0 }}>
            <VpnKeyOutlinedIcon style={{ fontSize: 50 }} />
            <h4>Take the keys</h4>
            <p>
              Now, contracts have been signed and contract terms have been met,
              the final phase is handling the keys to you to take ownership of
              your new home.
            </p>
          </How>
        </Procedure>
      </Property>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.auth.isAuthenticated) {
    return {
      admin: state.auth.user.service,
    };
  } else {
    return {
      admin: "others",
    };
  }
};

const connector = connect(mapStateToProps, null);
export default connector(RealEstateHome);
