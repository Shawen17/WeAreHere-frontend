import React from "react";
import Properties from "../components/realEstate/Properties";
import { useLocation } from "react-router-dom";

const PropertyPage = () => {
  const location = useLocation();
  const condition = location.state;

  return <Properties condition={condition} />;
};

export default PropertyPage;
