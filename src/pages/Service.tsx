import styled from "styled-components";
import { Header, Title, Sub } from "./About";
import ServiceBox from "../components/ServiceBox";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Container = styled.div`
  background: rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justiify-content: space-between;
  margin: 10px 10px 20px 10px;
  padding: 20px;
  flex-wrap: wrap;
`;

const Service = (props: any) => {
  document.title = "services";
  const navigate = useNavigate();

  const handleClick = (value: any): any => {
    if (props.isAuthenticated) {
      navigate("/booking", { state: value });
    } else {
      navigate("/login/?next=/properties", { state: "/booking" });
    }
  };

  const constMessage =
    "Are you an individual living abroad with dreams of owning a home back in Nigeria? We understand that distance can often create trust issues when it comes to managing construction projects remotely. That's why we're here to bridge the gap, building not just homes but also strong bonds of trust with our overseas clients.";

  return (
    <div className="page-boom" style={{ marginTop: 70 }}>
      <Header style={{ height: 70 }}>
        <Title style={{ overflow: "hidden" }}>
          <ul className="t ul">
            <li className="li">Construction.</li>
            <li className="li">Interior Decoration.</li>
            <li className="li">Event Planning.</li>
            <li className="li">Cleaning.</li>
            <li className="li">Plumbing.</li>
            <li className="li">Estate Management.</li>
            <li className="li">Real Estate.</li>
          </ul>
        </Title>
        <Sub>our range of services</Sub>
      </Header>
      <Container>
        <div onClick={() => handleClick("construction")}>
          <ServiceBox
            title="Construction"
            message={constMessage}
            src="/construction-service2.jpg"
            alt="paint"
          />
        </div>
        <div onClick={() => handleClick("plumbing")}>
          <ServiceBox
            title="Plumbing"
            message="introducing our top-notch plumbing service! Got a leak, clog, or plumbing woe? 
          We are here to save the day! Our skilled team of experts is at your service, from installing 
          new plumbing fittings to fixing complex pipe repairs"
            src="/plumbing-service.jpg"
            alt="plumbing"
            invert={true}
          />
        </div>
        <div onClick={() => handleClick("interior")}>
          <ServiceBox
            title="Interior Decoration"
            message="Let's make your Home and office have the right ambience, with that class of luxury that fits your budget"
            src="/interior.jpg"
            alt="interior"
          />
        </div>
        <div onClick={() => handleClick("tiling")}>
          <ServiceBox
            title="Tiling"
            message="we are here for you"
            src="/tiling-service1.jpg"
            alt="tiling"
            invert={true}
          />
        </div>
        <div onClick={() => handleClick("upholstery")}>
          <ServiceBox
            title="Upholstery"
            message="we are here for you"
            src="/upholstery-service.jpg"
            alt="upholstery"
          />
        </div>
        <div onClick={() => handleClick("painting")}>
          <ServiceBox
            title="Painting"
            message="we are here for you"
            src="/painting_service.jpg"
            alt="painting"
            invert={true}
          />
        </div>
        <div onClick={() => handleClick("event planning")}>
          <ServiceBox
            title="Event Planning"
            message="For Corporate or Owanbe Events, our seasoned and top notch planners will make your event a beauty"
            src="/event planning-service1.jpg"
            alt="event"
          />
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Service);
