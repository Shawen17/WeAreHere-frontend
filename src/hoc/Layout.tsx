import React from "react";
import NavBar from "../components/NavBar";

const Layout = (props: any) => {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
};

export default Layout;
