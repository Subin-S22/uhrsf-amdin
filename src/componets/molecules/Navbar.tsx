import { Button, Menu, MenuItem } from "@mui/material";
import profile from "../../assets/profile.png";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface Props {
  handleSideBarClose: () => void;
  open: boolean;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  anchorEl: any;
  handleClose: () => void;
}

const Navbar = ({
  handleSideBarClose,
  open,
  handleClick,
  anchorEl,
  handleClose,
}: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("login");
  };

  return (
    <nav
      className={`sticky top-0 shadow-lg pt-2 px-4 flex justify-between items-center bg-white z-10`}
    >
      <div className="cursor-pointer" onClick={handleSideBarClose}>
        <GoThreeBars />
      </div>
      <div></div>
      <div>
        <div className="flex justify-center items-center gap-2">
          <Button
            className="text-black"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <div className="w-10 h-10">
              <img src={profile} alt="profile" className="rounded-full" />
            </div>
            <div>
              <h4 className=" text-black lowercase font-bold text-base">
                Welcome Admin
              </h4>
              <p className="text-gray-600 lowercase text-sm">admin@admin.com</p>
            </div>
            <FiChevronDown className="text-black" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
