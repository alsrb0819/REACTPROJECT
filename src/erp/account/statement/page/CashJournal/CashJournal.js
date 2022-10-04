import React from "react";
import { Typography } from "@material-ui/core";
import CashJournalMenu from "./CashJournalMenu";
import CashJournalGrid from "./CashJournalGrid";

const CashJournal = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        현금출납장
      </Typography>
      <CashJournalMenu />
      <CashJournalGrid />
    </>
  );
};

export default CashJournal;
