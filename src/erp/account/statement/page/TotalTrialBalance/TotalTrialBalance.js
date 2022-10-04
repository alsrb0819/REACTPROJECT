import React from "react";
import TotalTrialBalanceGrid from "./TotalTrialBalanceGrid";
import TotalTrialBalanceMenu from "./TotalTrialBalanceMenu";
import { Typography } from "@material-ui/core";

const TotalTrialBalance = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        합계 잔액 시산표
      </Typography>
      <TotalTrialBalanceMenu />
      <TotalTrialBalanceGrid />
    </>
  );
};

export default TotalTrialBalance;
