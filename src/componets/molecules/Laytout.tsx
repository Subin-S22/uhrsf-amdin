import React, { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

type Props = {
  children: React.ReactNode;
};

const Laytout = ({ children }: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSideBarClose = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <main>
      <Navbar
        handleClick={handleClick}
        handleClose={handleClose}
        handleSideBarClose={handleSideBarClose}
        anchorEl={anchorEl}
        open={open}
      />

      <SideBar
        openSidebar={openSidebar}
        handleSideBarClose={handleSideBarClose}
      />
      {children}
    </main>
  );
};

export default Laytout;
