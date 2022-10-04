import React from "react";
import TravelComp from "./TravelComp";

//*************************외출 및 조퇴 시작 _준서 _20.08.24 *************************
const Travel = (props) => {
  console.log("<< RestAttendance.js >>");
  console.log(props);
  return (
    <div>
      <TravelComp />
    </div>
  );
};

export default Travel;
//*************************외출 및 조퇴 종료 _준서 _20.08.24 *************************
