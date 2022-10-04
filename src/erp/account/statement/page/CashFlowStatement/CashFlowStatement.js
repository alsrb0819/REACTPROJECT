import React from "react";
import CashFlowStatementGrid from "./CashFlowStatementGrid";
import CashFlowStatementMenu from "./CashFlowStatementMenu";
import { Typography } from "@material-ui/core";

const CashFlowStatement = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        현금흐름표
      </Typography>
      <CashFlowStatementMenu />
      <CashFlowStatementGrid />
    </>
  );
};

export default CashFlowStatement;
