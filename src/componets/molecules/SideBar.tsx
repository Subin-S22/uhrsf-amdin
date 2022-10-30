import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import profile from "../../assets/profile.png";
import logo from "../../assets/uhrsf_logo.png";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../shared/hooks/useWindowDimensions";

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
        value: "executives",
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
];

const SideBar = ({ openSidebar, handleSideBarClose }: Props) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const sideBarAction = () => {
    if (width < 1000) {
      handleSideBarClose();
    }
  };
  const handleRouting = (route: string) => {
    switch (route) {
      case "dashboard":
        navigate(`/${route}`);
        sideBarAction();
        break;
      case "rejected":
        navigate(`/application/${route}`);
        sideBarAction();
        break;
      case "approved":
        navigate(`/application/${route}`);
        sideBarAction();
        break;
      case "members":
        navigate(`/application/${route}`);
        sideBarAction();
        break;
      case "executives":
        navigate(`/application/${route}`);
        sideBarAction();
        break;
      case "disabled members":
        navigate(`/application/${route}`);
        sideBarAction();
        break;
      case "add-user":
        navigate(`/application/${route}`);
        sideBarAction();
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
        } fixed top-0 lg:top-[66px] z-[12] lg:-translate-y-16 left-0 w-56 md:w-80 bg-dark_blue h-screen transition-all ease-in-out`}
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
          className="text-base cursor-pointer font-medium text-white p-2 m-2"
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
                        onClick={() => handleRouting(side.value)}
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
