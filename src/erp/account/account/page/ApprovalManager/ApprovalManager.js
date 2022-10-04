/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import ApprovalManagerHeader from "./ApprovalManagerHeader";
import SlipGrid from "./SlipGrid";
import JournalGrid from "./JournalGrid";

const ApprovalManager = () => {
  const [flag, setFlag] = useState(false);
  const [slipNo, setSlipNo] = useState("");
  // slipNo 는 SlipGrid 컴포넌트에서 그리드 한 줄을 클릭하면
  // JournalGrid 컴포넌트에서 전표번호(slipNo)를 받아서 다시 조회 후 그리드에 표현.

  return (
    <>
      <Typography variant="h3" gutterBottom>
        전표승인
      </Typography>
      <ApprovalManagerHeader setFlag={setFlag} />
      <Paper>
        <div>
          <SlipGrid setSlipNo={setSlipNo} setFlag={setFlag} />
        </div>
        <div>
          <JournalGrid slipNo={slipNo} flag={flag} />
        </div>
      </Paper>
    </>
  );
};

export default ApprovalManager;
