import React from "react";
import MonthIncomeStatementGrid from "./MonthIncomeStatementGrid";
import MonthIncomeStatementMenu from "./MonthIncomeStatementMenu";
import { Typography } from "@material-ui/core";

const MonthIncomeStatement = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        월별손익계산서
      </Typography>
      <MonthIncomeStatementMenu />
      <MonthIncomeStatementGrid />
    </>
  );
};

export default MonthIncomeStatement;
