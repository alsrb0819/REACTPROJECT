import React from "react";
import { Typography } from "@material-ui/core";
import JournalFormGrid from "./JournalFormGrid";
import JournalFormMenu from "./JournalFormMenu";

const JournalForm = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        분개장
      </Typography>
      <JournalFormMenu />
      <JournalFormGrid />
    </>
  );
};

export default JournalForm;
