import accountApi from "api/accountApi";

export const selectSlip = (action) =>
accountApi.get("/account/findRangedSlipList", {
    params: {
      startDate: action.params.startDate,
      endDate: action.params.endDate,
      slipStatus: action.params.slipStatus,
    },
  });

  export const deleteSlip = (action) =>
  accountApi.get("/account/deleteSlip", {
    params: { slipNo: action.payload.slipNo },
  });

  export const updateSlip = (action) => 
  accountApi.get("/account/updateSlip", {
    params: {
      slipType: action.payload.slipType,
      expenseReport: action.payload.expenseReport,
      slipNo: action.payload.slipNo,
    },
  });

  export const searchJournal = (action) =>
  accountApi.get("/account/findSingleJournalList", {
    params: { slipNo: action.payload.slipNo },
  });

  export const deleteJournal = (action) =>
  accountApi.get("/account/deleteJournalRow", {
    params: {
      slipNo: action.payload.slipNo,
      journalNo: action.payload.journalNo,
    },
  });

  export const saveJournal = (action) =>
  accountApi.post(
    "/account/addSlip",
    {
      slipData: action.payload.slipData,
    },
  );

  export const updateJournal = (action) =>
  accountApi.post(
    "/account/updateJournalList",
    { journalList: action.payload.journalList },
    { headers: { "Content-Type": "application/json" } },
  );

  export const searchJournalDetail = (action) =>
  accountApi.get("/account/getJournalDetailList", {
    params: { journalNo: action.payload.journalNo },
  });

  export const saveJournalDetail = (action) =>
  accountApi.post(
    "/account/SaveJournalDetailList",
    { SaveJournalDetailList: action.payload.SaveJournalDetailList },
    { headers: { "Content-Type": "application/json" } },
  );

  export const hrAddSlip = (action) =>
  accountApi.post(
    "/account/hrAddSlip",
    { slipData: action.payload.slipData },
    { headers: { "Content-Type": "application/json" } },
  );

  export const amSlipRequest = (action) =>
  accountApi.get("/account/findRangedSlipList", {
    params: {
      startDate: action.params.startDate,
      endDate: action.params.endDate,
      slipStatus: action.params.slipStatus,
    },
  });

  export const amJournalRequest = (action) =>
  accountApi.get("/account/findSingleJournalList", {
    params: {
      slipNo: action.params.slipNo,
    },
  });

  export const getJournalNo = (action) =>
  accountApi.get("/account/getJournalDetailList", {
    params: {
      journalNo: action.journalNo,
    },
  });

  export const selectGeneralAccountLedger = (action) =>
  accountApi.get(
    "/account/findGeneralAccountLedgerList",
    {
      params: {
        startDate: action.params.startDate,
        endDate: action.params.endDate,
      },
    },
  );

  export const searchJournalDouble = (action) =>
  accountApi.get("/account/journalDouble", {
    params: {
      startDate: action.params.startDate,
      endDate: action.params.endDate,
    },
  });

  export const selectNonCurrent = (action) =>
  accountApi.post(
    "/CurrentAsset/findCurrentAssetList",
    {
      params: {
        accountCode: action.params.accountCode,
        accountName: action.params.accountName,
      },
    },
  );

  export const saveNonCurrent = (action) =>
  accountApi.post(
    "/CurrentAsset/insertCurrentAsset",
    {
      params: action.params,
    },
  );

  export const deleteNonCurrent = (action) =>
  accountApi.get(
    "/CurrentAsset/deleteCurrentAsset",
    {
      params: { assetCode: action.param.assetCode },
    },
  );