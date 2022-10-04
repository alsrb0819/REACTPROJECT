import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import GeneralAccountLedgerGrid from "./GeneralAccountLedgerGrid";
import GeneralAccountLedgerMenu from "./GeneralAccountLedgerMenu";

const GeneralAccountLedger = () => {
  const [generalAccountLedgerGrid, setGeneralAccountLedgerGrid] = useState("");
  return (
    <>
      <Typography variant="h3" gutterBottom>
        총계정원장
      </Typography>
      <GeneralAccountLedgerMenu
        generalAccountLedgerGrid={generalAccountLedgerGrid}
      />
      <GeneralAccountLedgerGrid
        setGeneralAccountLedgerGrid={setGeneralAccountLedgerGrid}
      />
    </>
  );
};

export default GeneralAccountLedger;
