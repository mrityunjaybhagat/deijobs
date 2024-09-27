import React from "react";

import { ChevronUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/utils/utils";
import { Link } from "react-router-dom";
import defaultLogo from "@/assets/img/icons/company_default_logo.jpg";
const ListCard = ({
  icon,
  title,
  properties,
  route,
  cardClass,
  callback,
  jobCard,
  postedBy,
  job,
  externalRedirect = false,
}) => {
  const handleCardClick = (e) => {
    if (externalRedirect) {
      // If the externalRedirect prop is true, treat it as an external link
      window.open(route, "_blank");
      e.preventDefault();
    } else {
      // Handle internal navigation as needed
      // Example: You can use a router library to navigate within your app
    }
  };

  const CardData = (
    <Card
      className={cn("h-[84px] w-full rounded-xl", cardClass)}
      onClick={callback}
    >
      <CardContent className=" w-full h-full p-5 ">
        <div className="w-full flex items-center justify-between h-full">
          <div className=" w-11/12 flex gap-4 justify-between items-center overflow-hidden ">
            {icon}
            <div className="w-full flex flex-col gap-1">
              <div className="max-w-[90%] text-gray-900 text-sm font-light font-['Lexend'] leading-normal overflow-hidden whitespace-nowrap text-ellipsis">
                {job?.job_title}
              </div>
              {job?.employement_type ? (
                <div className="max-w-[90%] h-4 text-gray-500 text-xs font-light leading-tight overflow-hidden whitespace-nowrap text-ellipsis">
                  {[job?.employement_type, job?.employer_name, job?.city]?.join(
                    " • "
                  )}
                </div>
              ) : null}
              {jobCard ? (
                <div className="max-w-[90%] h-4 text-gray-500 text-xs font-light font-['Lexend'] leading-tight overflow-hidden whitespace-nowrap text-ellipsis">
                  Job posted by {job?.posted_by}
                </div>
              ) : null}
            </div>
          </div>
          <Button variant={"ghost"} className="p-0 h-6 w-6">
            <ChevronUp className="transform rotate-90 text-slate-700 h-4 w-4 font-bold" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  if (externalRedirect) {
    return (
      <a
        href={route}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCardClick}
      >
        {CardData}
      </a>
    );
  } else {
    if (route)
      return (
        <Link to={route || ""} onClick={handleCardClick}>
          {CardData}
        </Link>
      );

    return CardData;
  }
  // if (route) return <Link to={route || ""}>{CardData}</Link>;
  // return CardData;
};

export default ListCard;
