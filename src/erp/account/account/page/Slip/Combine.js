import React, { memo } from "react";
import SlipForm from "./SlipForm";
import Journal from "./Journal";
import JournalDetail from "./JournalDetail";
import { Typography } from "@material-ui/core";
import SlipFormMenu from "./SlipFormMenu";

//=================================================== 2020-09-10 조편백 일반전표 : 전표 , 분개 , 분개상세  합침  =========================================
const Combine = props => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        일반전표
      </Typography>
      <SlipFormMenu setVisibleState={props.setVisibleState} />
      <SlipForm
        setVisibleState={props.setVisibleState}
        setSilpRow={props.setSilpRow}
        handleSearchJournal={props.handleSearchJournal}
      />
      <Journal
        visibleState={props.visibleState}
        journalList={props.journalList}
        silpRow={props.silpRow}
        handleDeleteJournal={props.handleDeleteJournal}
        handleSearchJournalDetail={props.handleSearchJournalDetail}
        handleSaveJournal={props.handleSaveJournal}
        setVisibleState={props.setVisibleState}
        handleUpdateJournal={props.handleUpdateJournal}
        handlCloseSalaryWithSlipRequest={props.handlCloseSalaryWithSlipRequest}
        handlCloseDeliveryWithStart={props.handlCloseDeliveryWithStart}
        handlCloseOrderWithStart={props.handlCloseOrderWithStart}
        error={props.error}
      />
      <JournalDetail
        journalDetailList={props.journalDetailList}
        handlSaveJournalDetailList={props.handlSaveJournalDetailList}
        error={props.error}
      />
    </>
  );
};
export default Combine;
