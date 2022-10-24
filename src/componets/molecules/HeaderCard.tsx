import React from "react";
import { SlPeople } from "react-icons/sl";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineLocalPolice } from "react-icons/md";

type Props = {};

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
const HeaderCard = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-around items-center max-w-[730px] mx-auto gap-4">
      {cardsDetails.map((item) => {
        return (
          <div
            key={`item-${item.name}`}
            className="shadow-[1px_2px_6px_1px_#cdcdcd] rounded-md p-4 min-w-[14rem]"
          >
            {<item.icon className="text-3xl" />}
            <div className="text-center textlg font-semibold">{item.total}</div>
            <div className="text-center text-md font-medium text-gray-500">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeaderCard;
