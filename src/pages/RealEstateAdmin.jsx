import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Checkbox,
  Button,
} from "@mui/material";
import { handleDate } from "../components/UserAccount";
import { Container } from "../components/form/LoginForm";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { BASE_URL } from "../components/Api";
import DeleteButton from "../components/realEstate/DeleteButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CircularProgress from "@mui/material/CircularProgress";

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

const SideContainer = styled.div`
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

const Admin = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-bottom: 20px;
  color: white;
  margin-bottom: 5px;
  cursor: pointer;
`;

const pageSize = 3;

const RealEstateAdmin = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState({ items: { orders: [], bookings: [] } });
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [clicked, setClicked] = useState(false);

  const propertyClicked = () => {
    setClicked(false);
  };

  const bookingClicked = () => {
    setClicked(true);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const body = JSON.stringify({ email });
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        };
        const response = await axios.put(
          `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/get-property/`,
          body,
          config
        );

        setData({ items: response.data });
        const count = response.data.orders.length;
        setPages(Math.ceil(count / pageSize));
      } catch (error) {
        setError("something went wrong");
      }
    };

    fetchProperties();
  }, [email, deleted, updated]);

  const toggleRowSelection = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, id];
    } else {
      newSelected = selectedRows.filter((rowId) => rowId !== id);
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const propertyStatus = (status) => {
    if (status === true) {
      return <div className="sold">sold</div>;
    } else {
      return <div className="unsold">unsold</div>;
    }
  };

  const meetingScheduled = (cond) => {
    if (cond === true) {
      return <div className="sold">scheduled</div>;
    } else {
      return <div className="unsold">unscheduled</div>;
    }
  };

  const dealReached = (deal) => {
    if (deal === true) {
      return <div className="sold">deal</div>;
    } else {
      return <div className="unsold">no deal</div>;
    }
  };

  const currentProperty = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.items.orders.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data.items.orders]);

  const currentBooking = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.items.bookings.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data.items.bookings]);

  const handleEdit = (id) => {
    const index = currentProperty.findIndex((item) => item.id === id);
    const formData = currentProperty[index];
    const facility = formData.facility;
    const data = { ...formData, facility: facility };
    navigate("/admin/edit", { state: data });
  };

  const deleteRows = async () => {
    setDeleted(false);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/delete-properties/?my_array=${selectedRows}`,

        config
      );
      if (response.status === 204) {
        setDeleted(true);
      }
    } catch (error) {
      setError("Error deleting item");
    }
  };

  const onDelete = async (id) => {
    setDeleted(false);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/delete-property/${id}/`,

        config
      );
      if (response.status === 204) {
        setDeleted(true);
      }
    } catch (error) {
      setError("Error deleting item");
    }
  };

  const markScheduled = async (action) => {
    setUpdated(false);
    setError("");
    try {
      const body = JSON.stringify({ action: action });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      await axios.put(
        `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/update-bookings/?my_array=${selectedRows}`,
        body,
        config
      );
      setError("item(s) updated");
      setUpdated(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setError("Error updating item");
    }
  };

  const editBooking = (data) => {
    navigate("/admin/booking/edit", { state: data });
  };

  const Properties =
    currentProperty.length > 0 ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Facility</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Property Status</TableCell>
              <TableCell>Video</TableCell>
              <TableCell>Image1</TableCell>
              <TableCell>Image2</TableCell>
              <TableCell>Image3</TableCell>
              <TableCell>Image4</TableCell>
              <TableCell>Image5</TableCell>
              <TableCell>Image6</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentProperty.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox
                    checked={isSelected(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </TableCell>
                <TableCell
                  className="edit-td"
                  onClick={() => handleEdit(row.id)}
                >
                  {row.description}
                </TableCell>
                <TableCell>{JSON.stringify(row.facility)}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.details}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{propertyStatus(row.already_sold)}</TableCell>
                <TableCell>{`${BASE_URL}${row.videofile}`}</TableCell>
                <TableCell>{`${BASE_URL}${row.videofile}`}</TableCell>
                <TableCell>{`${BASE_URL}${row.image1}`}</TableCell>
                <TableCell>{`${BASE_URL}${row.image2}`}</TableCell>
                <TableCell>{`${BASE_URL}${row.image3}`}</TableCell>
                <TableCell>{`${BASE_URL}${row.image4}`}</TableCell>
                <TableCell>{`${BASE_URL}${row.image5}`}</TableCell>
                <TableCell>{`${BASE_URL}${row.image6}`}</TableCell>
                <TableCell>
                  <DeleteButton
                    onDelete={onDelete}
                    id={row.id}
                    title={<DeleteForeverOutlinedIcon />}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <div className="middle">
        <CircularProgress color="success" />
      </div>
    );

  const Bookings = (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Customer Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Apartment</TableCell>
            <TableCell>Inspection Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Meeting Scheduled</TableCell>
            <TableCell>Agreement Reached</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentBooking.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={isSelected(row.id)}
                  onChange={() => toggleRowSelection(row.id)}
                />
              </TableCell>
              <TableCell className="edit-td" onClick={() => editBooking(row)}>
                {row.customer_email}
              </TableCell>
              <TableCell>{row.customer_phone}</TableCell>
              <TableCell>{row.apartment}</TableCell>
              <TableCell>{handleDate(row.schedule_date)}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>
                {meetingScheduled(row.is_meeting_scheduled)}
              </TableCell>
              <TableCell>{dealReached(row.agreement_made)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div style={{ marginTop: 70, display: "flex", flexDirection: "column" }}>
      <Admin>
        {selectedRows.length > 1 && !clicked ? (
          <DeleteButton title="Delete Selected" onDelete={deleteRows} />
        ) : (
          ""
        )}
        {selectedRows.length > 1 && clicked ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={() => markScheduled("deal")}>Mark Deal</Button>
            <Button onClick={() => markScheduled("meeting")}>
              Mark Scheduled
            </Button>
          </div>
        ) : (
          ""
        )}

        {!clicked && (
          <button style={{ borderRadius: 4 }}>
            <Link to="/admin/add" className="nav-item nav-link">
              <AddCircleOutlineOutlinedIcon />
              Add Property
            </Link>
          </button>
        )}
      </Admin>
      {updated ? <div style={{ textAlign: "center" }}>{error}</div> : ""}
      {deleted && (
        <p style={{ textAlign: "center" }}>Item(s) deleted successfully.</p>
      )}
      <div style={{ display: "flex" }}>
        <SideContainer>
          <Tp className="mt-2">Admin Panel</Tp>
          <Line className="mt-2" />
          <Top className="mt-4" onClick={propertyClicked}>
            <Info>Properties</Info>
          </Top>
          <Top className="mt-4" onClick={bookingClicked}>
            <Info>Bookings</Info>
          </Top>
          <Top className="mt-4">
            <Info>Subscribe</Info>
          </Top>
        </SideContainer>
        <Container style={{ marginTop: 20 }}>
          {clicked ? Bookings : Properties}
        </Container>
      </div>

      <div className="pagination">
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

export default RealEstateAdmin;
