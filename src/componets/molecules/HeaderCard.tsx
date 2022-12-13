import React, { useEffect, useCallback } from "react";
import { SlPeople } from "react-icons/sl";
import { BiTimeFive, BiHome } from "react-icons/bi";
import { MdOutlineLocalPolice } from "react-icons/md";
import { getByStatus, membersCount } from "../../services/admin";
import { IconType } from "react-icons/lib";

type Props = {
  applicationCount: number;
  branchCount: number;
};

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

  const fetchMembersCount = useCallback(async () => {
    try {
      const res: any = await membersCount();
      const executive = await getByStatus("executive");

      const temp = cards.map((detail) => {
        if (detail.name === "Members Enrolled") {
          return { ...detail, total: res.data.count };
        } else if (detail.name === "Applications Received") {
          return { ...detail, total: props.applicationCount };
        } else if (detail.name === "Executives Enrolled") {
          return { ...detail, total: executive.data.count };
        } else if (detail.name === "Branches") {
          return { ...detail, total: props.branchCount };
        } else {
          return detail;
        }
      });
      console.log(temp);

      setCards(temp);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.applicationCount, props.branchCount]);

  useEffect(() => {
    fetchMembersCount();
  }, [fetchMembersCount]);

  // useEffect(() => {
  //   const temp = cards.map((detail) => {
  //     if (detail.name === "Applications Received") {
  //       return { ...detail, total: props.applicationCount };
  //     } else {
  //       return detail;
  //     }
  //   });
  //   setCards(temp);
  // }, []);

  return (
    <div className="flex flex-wrap justify-center items-center mx-auto gap-4">
      {cards.map((item) => {
        return (
          <div
            key={`item-${item.name}`}
            className="shadow-[1px_2px_6px_1px_#cdcdcd] rounded-md p-4 min-w-[14rem] bg-white"
          >
            {<item.icon className="text-3xl" />}
            <div className="text-center lg:textlg text-base font-semibold">
              {item.total}
            </div>
            <div className="text-center lg:text-base text-sm font-medium text-gray-500">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeaderCard;
