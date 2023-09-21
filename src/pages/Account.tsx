import React from "react";
import SideMenu from "../components/SideMenu";
import UserAccount from "../components/UserAccount";

const Account = () => {
  document.title = "dashboard";
  return (
    <div className="activation-load" style={{ marginTop: 70, display: "flex" }}>
      <SideMenu />
      <UserAccount />
    </div>
  );
};

export default Account;
