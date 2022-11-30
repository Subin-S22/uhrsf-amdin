import { useContext } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import profile from "../../assets/profile.png";
import logo from "../../assets/uhrsf_logo.png";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../shared/hooks/useWindowDimensions";
import { Context } from "../../context";

interface Props {
  openSidebar: boolean;
  handleSideBarClose: () => void;
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
        value: "members",
      },
      {
        name: "Disabled Members",
        value: "disabled members",
      },
    ],
  },
  {
    name: "Executive",
    sub: [
      {
        name: "List Executives",
        value: "executive",
      },
    ],
  },
  {
    name: "User Management",
    sub: [
      {
        name: "Add User",
        value: "add-user",
      },
    ],
  },
  {
    name: "Branch Manage",
    sub: [
      {
        name: "Add branch",
        value: "add-branch",
      },
      {
        name: "Branch List",
        value: "branches",
      },
    ],
  },
];

const SideBar = ({ openSidebar, handleSideBarClose }: Props) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const store = useContext(Context);

  const sideBarAction = () => {
    if (width < 1000) {
      handleSideBarClose();
    }
  };
  const handleRouting = (route: string, name?: string) => {
    switch (route) {
      case "dashboard":
        sideBarAction();
        navigate(`/${route}`);
        break;
      case "viewAll":
        sideBarAction();
        store?.action.setTableName("Appliations");
        navigate(`/application/view-all`);
        break;
      case "rejected":
        sideBarAction();
        store?.action.setTableName("Application Rejected");
        navigate(`/application/${route}`);
        break;
      case "approved":
        sideBarAction();
        store?.action.setTableName("Application Approved");
        navigate(`/application/${route}`);
        break;
      case "members":
        sideBarAction();
        store?.action.setTableName("Members");
        navigate(`/application/${route}`);
        break;
      case "executive":
        store?.action.setTableName("Executives");
        sideBarAction();
        navigate(`/application/${route}`);
        break;
      case "disabled members":
        store?.action.setTableName("Disabled Members");
        sideBarAction();
        navigate(`/application/${route}`);
        break;
      case "add-user":
        store?.action.setTitle("AddUser");
        store?.action.setUserDetails({});
        sideBarAction();
        navigate(`/application/${route}`);
        break;
      case "add-branch":
        sideBarAction();
        navigate(`/application/${route}`);
        break;
      case "branches":
        store?.action.setTableName("Branch List");
        sideBarAction();
        navigate(`/application/${route}`);
        break;
      default:
    }
  };
  return (
    <>
      {openSidebar ? (
        <div
          className="lg:hidden backdrop-brightness-50 h-full w-screen fixed top-0 z-[11]"
          onClick={handleSideBarClose}
        ></div>
      ) : null}
      <div
        className={`overflow-auto ${
          openSidebar ? "lg:translate-x-0" : "translate-x-[-100%]"
        } fixed top-0 lg:top-[64px] z-[12] lg:-translate-y-16 left-0 w-56 md:w-72 bg-dark_blue h-screen transition-all ease-in-out`}
      >
        <div
          onClick={handleSideBarClose}
          className="text-white lg:hidden p-4 float-right"
        >
          X
        </div>
        <div className="w-20 h-20 mx-auto mt-4">
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
        <li
          className="text-base cursor-pointer font-medium text-white p-2 m-2 lg:text-lg"
          onClick={() => {
            handleRouting("dashboard");
            sideBarAction();
          }}
        >
          Dashboard
        </li>
        {sideBarOptions.slice(1).map((sidebar, index) => (
          <Accordion
            key={index}
            className={`!bg-dark_blue text-white my-0 ml-2 `}
            onClick={() => handleRouting(sidebar.name)}
          >
            <AccordionSummary
              aria-controls={sidebar.name}
              id={`${sidebar.name}${index}`}
              className="inner_div_flex text-base lg:text-lg"
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
                        onClick={() => handleRouting(side.value, side.name)}
                        className="text-xs font-medium text-slate-300 p-2 m-2 cursor-pointer"
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
