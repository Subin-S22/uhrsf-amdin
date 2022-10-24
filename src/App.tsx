import React, { useState } from "react";
import { GoThreeBars } from "react-icons/go";
import logo from "./assets/uhrsf_logo.png";
import profile from "./assets/profile.png";
import { Button, Menu, MenuItem } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { SlPeople } from "react-icons/sl";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineLocalPolice } from "react-icons/md";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Table from "./componets/molecules/Table";

const sideBarOptions = [
  {
    name: "Dashboard",
    noExpand: false,
  },
  {
    name: "Application",
    sub: [
      {
        name: "View All",
        value: "viewAll",
      },
      {
        name: "Approved Application List",
        value: "approved",
      },
      {
        name: "Rejected Application List",
        value: "rejected",
      },
    ],
  },
  {
    name: "Members Management",
    sub: [
      {
        name: "List Members",
        value: "viewAll",
      },
    ],
  },
  {
    name: "Executive",
    sub: [
      {
        name: "List Executives",
        value: "viewAll",
      },
    ],
  },
];

const cardsDetails = [
  {
    icon: SlPeople,
    total: 0,
    name: "Applications Received",
  },
  {
    icon: BiTimeFive,
    total: 0,
    name: "Members Enrolled",
  },
  {
    icon: MdOutlineLocalPolice,
    total: 0,
    name: "Executives Enrolled",
  },
];

function App() {
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

  const handleRouting = (route: string) => {
    console.log(route);
  };

  return (
    <div>
      <nav
        className={`sticky top-0 shadow-lg pt-2 px-4 flex justify-between items-center bg-white z-10`}
      >
        <div className="cursor-pointer" onClick={handleSideBarClose}>
          <GoThreeBars />
        </div>
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
                <p className="text-gray-600 lowercase text-sm">
                  admin@admin.com
                </p>
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </nav>
      {openSidebar ? (
        <div
          className="backdrop-brightness-50 h-screen w-screen absolute top-0 z-[11]"
          onClick={handleSideBarClose}
        ></div>
      ) : null}
      <div
        className={`overflow-auto ${
          openSidebar ? "translate-x-0" : "translate-x-[-100%]"
        } fixed top-0 z-[12] left-0 w-48 md:w-60 bg-dark_blue h-screen transition-all ease-in`}
      >
        <div className="w-20 h-20 mx-auto">
          <img src={logo} alt="logo" className="w-full h-auto" />
        </div>
        <div className="flex justify-center items-center my-4 gap-2">
          <div className="w-12 h-12">
            <img src={profile} alt="profile" className="rounded-full" />
          </div>
          <div>
            <h4 className="text-white font-bold text-base">Welcome Admin</h4>
            <p className="text-white text-sm">admin@admin.com</p>
          </div>
        </div>
        {sideBarOptions.map((sidebar, index) => (
          <Accordion
            className={`!bg-dark_blue text-white my-0 `}
            onClick={() => handleRouting(sidebar.name)}
          >
            <AccordionSummary
              aria-controls={sidebar.name}
              id={`${sidebar.name}${index}`}
              className="inner_div_flex"
            >
              <span>{sidebar.name}</span>
              {sidebar.sub?.length && <FiChevronDown />}
            </AccordionSummary>
            {sidebar.sub?.length ? (
              <AccordionDetails>
                <ul className="list-disc ml-4">
                  {sidebar.sub?.map((side) => {
                    return (
                      <li
                        onClick={() => handleRouting(side.name)}
                        className="text-sm font-medium text-slate-300 p-2 m-2"
                      >
                        {side.name}
                      </li>
                    );
                  })}
                </ul>
              </AccordionDetails>
            ) : null}
          </Accordion>
        ))}
      </div>
      {/* cards */}
      <section className="mt-6">
        <div className="flex flex-wrap justify-around items-center max-w-[730px] mx-auto gap-4">
          {cardsDetails.map((item) => {
            return (
              <div
                key={`item-${item.name}`}
                className="shadow-[1px_2px_6px_1px_#cdcdcd] rounded-md p-4 min-w-[14rem]"
              >
                {<item.icon className="text-3xl" />}
                <div className="text-center textlg font-semibold">
                  {item.total}
                </div>
                <div className="text-center text-md font-medium text-gray-500">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="m-4">
        <Table title="Application Received" />
        <Table title="Members Enrolled" />
      </section>
    </div>
  );
}

export default App;
