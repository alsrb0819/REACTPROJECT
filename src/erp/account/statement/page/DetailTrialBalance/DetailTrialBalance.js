import React from "react";
import { Typography } from "@material-ui/core";
import DetailTrialBalanceGrid from "./DetailTrialBalanceGrid";
import DetailTrialBalanceMenu from "./DetailTrialBalanceMenu";

const DetailTrialBalance = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        일(월)계표
      </Typography>
      <DetailTrialBalanceMenu />
      <DetailTrialBalanceGrid />
    </>
  );
};

export default DetailTrialBalance;
