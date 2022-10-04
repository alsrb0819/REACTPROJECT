import React from "react";
import IncomeStatementGrid from "./IncomeStatementGrid";
import IncomeStatementMenu from "./IncomeStatementMenu";
import { Typography } from "@material-ui/core";

const IncomeStatement = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        손익계산서
      </Typography>
      <IncomeStatementMenu />
      <IncomeStatementGrid />
    </>
  );
};

export default IncomeStatement;
