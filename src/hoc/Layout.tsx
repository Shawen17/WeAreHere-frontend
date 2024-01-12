import NavBar from "../components/NavBar";

const Layout = (props: any) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};

export default Layout;
