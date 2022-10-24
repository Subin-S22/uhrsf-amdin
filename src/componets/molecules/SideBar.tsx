import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import profile from "../../assets/profile.png";
import logo from "../../assets/uhrsf_logo.png";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

interface Props {
  openSidebar: boolean;
  handleSideBarClose: React.MouseEventHandler<HTMLDivElement>;
}

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

const SideBar = ({ openSidebar, handleSideBarClose }: Props) => {
  const handleRouting = (route: string) => {
    console.log(route);
  };
  return (
    <>
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
            key={index}
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
                  {sidebar.sub?.map((side, index) => {
                    return (
                      <li
                        key={index}
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
    </>
  );
};

export default SideBar;
