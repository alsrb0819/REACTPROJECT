/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Typography } from "@material-ui/core";
import FinancialStatementsMenu from "./FinancialStatementsMenu";
import FinancialStatementsGrid from "./FinancialStatementsGrid";

const FinancialStatements = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        재무상태표
      </Typography>
      <FinancialStatementsMenu />
      <FinancialStatementsGrid />
    </>
  );
};

export default FinancialStatements;
