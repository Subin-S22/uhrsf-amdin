import React, { useEffect } from "react";
import { SlPeople } from "react-icons/sl";
import { BiTimeFive, BiHome } from "react-icons/bi";
import { MdOutlineLocalPolice } from "react-icons/md";
import { membersCount } from "../../services/admin";
import { IconType } from "react-icons/lib";

type Props = {};

interface Detail {
  icon: IconType;
  total: number;
  name: string;
}

let cardsDetails: Detail[] = [
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
  {
    icon: BiHome,
    total: 0,
    name: "Branches",
  },
];
const HeaderCard = (props: Props) => {
  const [cards, setCards] = React.useState<Detail[]>(cardsDetails);
  const fetchMembersCount = async () => {
    try {
      const res: any = await membersCount();
      console.log(res.data.memberEnrolledCount);
      const temp = cardsDetails.map((detail) => {
        if (detail.name === "Members Enrolled") {
          return { ...detail, total: res.data.memberEnrolledCount };
        } else {
          return detail;
        }
      });
      setCards(temp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembersCount();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center mx-auto gap-8">
      {cards.map((item) => {
        return (
          <div
            key={`item-${item.name}`}
            className="shadow-[1px_2px_6px_1px_#cdcdcd] rounded-md p-4 min-w-[14rem] bg-white"
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
