// **************** 2020-08-27 정대현 추가 ****************
import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { DialogTitle, DialogActions, Dialog, Button } from "@material-ui/core";

const JournalDetailDialog = ({ onClose, open }) => {
  const data = useSelector(
    ({ AccReducer }) => AccReducer.AccountReducer.journalDetailList.journalDetailList,
    [],
  );

  //========================== 그리드내용 ==========================
  const accountColumnDefs = [
    {
      headerName: "계정 설정 속성",
      field: "accountControlType",
      width: 120,
      sortable: true,
    },
    { headerName: "분개상세번호", field: "journalDetailNo", width: 130 },
    { headerName: "코드", field: "accountControlCode", width: 100 },
    { headerName: "분개상세항목", field: "accountControlName", width: 130 },
    { headerName: "분개상세내용", field: "journalDescription", width: 130 },
  ];

  const handleClose = () => {
    onClose({
      division: "detailDialog",
    });
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth="true"
      maxWidth="md"
    >
      <DialogTitle id="simple-dialog-title">분개상세</DialogTitle>
      <div
        className={"ag-theme-balham"}
        style={{
          height: "200px",
          width: "100%",
          //paddingTop: "20px",
          //paddingLeft: "150px",
        }}
      >
        <AgGridReact
          columnDefs={accountColumnDefs}
          rowData={data} // 그리드에 data 뿌림.
          onGridReady={e => e.api.sizeColumnsToFit()}
          getRowStyle={function(param) {
            return { "text-align": "center" };
          }}
        />
      </div>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default JournalDetailDialog;
