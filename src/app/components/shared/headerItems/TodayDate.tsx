// Complete Component: TodayDate.tsx

"use client";
import { useEffect, useState } from "react";

const TodayDate = () => {

  
  const [today, setToday] = useState("");

  // Get today's date in Bangla format
  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Dhaka",
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(formattedDate);
  }, []);

  return (
    <p className="text-sm ">
      {today || <span className="loading loading-dots loading-md text-center"></span>}
    </p>
  );
};

export default TodayDate;