import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../shared/hooks";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

interface Props {
  children: React.ReactNode;
}

const Laytout = ({ children, ...props }: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const { isLoggedIn } = useLoggedIn();
  console.log("is logged in", isLoggedIn);

  if (!isLoggedIn) {
    navigate("/login");
  }

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
    <main className="bg-slate-100">
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
      <div className="py-4">{children}</div>
    </main>
  );
};

export default Laytout;
