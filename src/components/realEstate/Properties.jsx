import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import PropertyModal from "./PropertyModal";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

const Property = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 80px 100px 40px 100px;
  flex-wrap: wrap;

  @media screen and (max-width: 468px) {
    margin: 80px 0px 0px 0px;
    padding: 0px 10px 0px 10px;
  }
`;
const pageSize = 3;

const Properties = () => {
  const [data, setData] = useState({ items: { orders: [] } });
  const [properties, setProperties] = useState(data.items.orders);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const location = useLocation();
  const condition = location.state;

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

  useEffect(() => {
    if (data.items.orders.length > 0) {
      var filteredProperty;
      filteredProperty = data.items.orders;

      if (condition) {
        if (condition.state && condition.category) {
          filteredProperty = data.items.orders.filter(function (property) {
            return (
              property.category === condition.category &&
              property.state === condition.state
            );
          });
        } else if (condition.state) {
          filteredProperty = data.items.orders.filter(function (property) {
            return property.state === condition.state;
          });
        } else {
          filteredProperty = data.items.orders.filter(function (property) {
            return property.category === condition.category;
          });
        }
      }
      setProperties(filteredProperty);
      const count = filteredProperty.length;
      setPages(Math.ceil(count / pageSize));
    }
  }, [condition, data.items.orders]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return properties.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, properties]);

  return (
    <div>
      <Property>
        <h6>{error}</h6>
        {currentData.length > 0 ? (
          currentData.map((item) => {
            return <PropertyModal key={item.id} property={item} />;
          })
        ) : (
          <div className="middle">
            <CircularProgress color="success" />
          </div>
        )}
      </Property>
      <div className="pagination" style={{ marginBottom: 20 }}>
        <Pagination
          count={pages}
          page={currentPage}
          onChange={handleChange}
          size="small"
          color="secondary"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default Properties;
