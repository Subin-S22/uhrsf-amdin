import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../shared/hooks";
import useWindowDimensions from "../../shared/hooks/useWindowDimensions";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

interface Props {
  children: React.ReactNode;
}

const Laytout = ({ children, ...props }: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { width } = useWindowDimensions();

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const { isLoggedIn } = useLoggedIn();

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

  useEffect(() => {
    if (width > 1000) {
      setOpenSidebar(true);
    } else {
      setOpenSidebar(false);
    }
  }, [width]);

  return (
    <main className="bg-slate-100 h-full">
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
      <div className="py-4 lg:ml-80 bg-slate-100">{children}</div>
    </main>
  );
};

export default Laytout;
