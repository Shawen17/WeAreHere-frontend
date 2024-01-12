import NavBar from "../components/NavBar";
import React, { ReactNode, useEffect, useState } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const Layout: React.FC<MyComponentProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NavBar scrolled={scrolled} />
      {children}
    </>
  );
};

export default Layout;
