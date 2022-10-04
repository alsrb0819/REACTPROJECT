import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import { DialogTitle, DialogActions, Dialog, Button } from "@material-ui/core";
import * as types from "../../reducer/JournalReducer";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";

const GeneralAccountLedgerDialog = ({ journalNo, open, onClose }) => {
  const dispatch = useDispatch();

  const data = useSelector(
    ({ AccReducer }) => AccReducer.journalDetailList.journalDetailList,
    [],
  );

  useEffect(() => {
    dispatch({
      type: types.SET_JOURNAL_NO_REQUEST,
      journalNo: journalNo,
    });
  }, [journalNo]);

  //========================== 그리드내용 ==========================
  const accountColumnDefsUp = [
    { headerName: "항목", field: "accountControlName", width: 210 },
  ];
  const accountColumnDefsDown = [
    { headerName: "항목내용", field: "journalDescription", width: 210 },
  ];

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle id="simple-dialog-title" Align="center">
        분 개 상 세
      </DialogTitle>
      <List>
        <div
          className={"ag-theme-material"}
          style={{
            height: "200px",
            width: "100%",
          }}
        >
          <AgGridReact
            columnDefs={accountColumnDefsUp}
            rowData={data} // 뿌릴 data
            rowSelection="single" // 하나만 선택 가능.
            onGridReady={event => {
              //그리드 크기자동조절
              event.api.sizeColumnsToFit();
            }}
            //onCellClicked={onClose} // cell을 클릭하면, handleClose가 실행된다.
            getRowStyle={param => ({ "text-align": "center" })}
          />
        </div>
        <div
          className={"ag-theme-material"}
          style={{
            height: "200px",
            width: "100%",
          }}
        >
          <AgGridReact
            columnDefs={accountColumnDefsDown}
            rowData={data} // 뿌릴 data
            rowSelection="single" // 하나만 선택 가능.
            onGridReady={event => {
              //그리드 크기자동조절
              event.api.sizeColumnsToFit();
            }}
            //onCellClicked={onClose} // cell을 클릭하면, handleClose가 실행된다.
            getRowStyle={param => ({ "text-align": "center" })}
          />
        </div>
      </List>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralAccountLedgerDialog;
