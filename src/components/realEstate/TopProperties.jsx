import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PropertyModal from "./PropertyModal";
import CircularProgress from "@mui/material/CircularProgress";

const Property = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 80px 100px 40px 100px;
  flex-wrap: wrap;

  @media screen and (max-width: 568px) {
    margin: 80px 0px 0px 0px;
    padding: 0px 10px 0px 10px;
  }
`;

const TopProperties = () => {
  const [data, setData] = useState({ items: { orders: [] } });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/properties/`,
          config
        );

        setData({ items: response.data });
      } catch (error) {
        setError("something went wrong");
      }
    };

    fetchProperties();
  }, []);

  return (
    <Property>
      <h6>{error}</h6>
      {data.items.orders.length > 0 ? (
        data.items.orders.slice(0, 6).map((item) => {
          return <PropertyModal key={item.id} property={item} />;
        })
      ) : (
        <div className="middle">
          <CircularProgress color="success" />
        </div>
      )}
    </Property>
  );
};

export default TopProperties;
