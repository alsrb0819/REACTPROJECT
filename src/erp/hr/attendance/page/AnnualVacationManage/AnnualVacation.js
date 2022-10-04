import React from "react";
import AnnualVacationComp from "./AnnualVacationComp";

const AnnualVacation = (props) => {
  console.log("<< AnnualVacationComp.js >>");
  console.log(props);
  return (
    <div>
      <AnnualVacationComp />
    </div>
  );
};

export default AnnualVacation;
