import { useState } from "react";
import SignupForm from "../components/form/SignupForm";
import SignupFormPartner from "../components/form/SignupFormPartner";
import { Badge } from "reactstrap";

const Signup = () => {
  const [clicked, setClicked] = useState(false);
  const handlePartner = () => {
    setClicked(true);
  };

  const handleUser = () => {
    setClicked(false);
  };

  return (
    <div className="ls">
      <div className="signup">
        <Badge
          className="badge"
          style={{
            color: "white",
            backgroundColor: "#18a558",
            borderRadius: 6,
            padding: 5,
            cursor: "pointer",
          }}
          onClick={handleUser}
        >
          User Signup
        </Badge>
        <Badge
          className="badge"
          style={{
            color: "white",
            backgroundColor: "#18a558",
            borderRadius: 6,
            padding: 5,
            cursor: "pointer",
          }}
          onClick={handlePartner}
        >
          Partner Signup
        </Badge>
      </div>
      {clicked ? <SignupFormPartner /> : <SignupForm />}
    </div>
  );
};

export default Signup;
