import React from "react";
import CostStatementGrid from "./CostStatementGrid";
import CostStatementMenu from "./CostStatementMenu";
import { Typography } from "@material-ui/core";

const CostStatement = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        원가명세서
      </Typography>
      <CostStatementMenu />
      <CostStatementGrid />
    </>
  );
};

export default CostStatement;
