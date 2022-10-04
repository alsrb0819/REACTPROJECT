import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, TextField } from "@material-ui/core";
import AccountSearchDialog from "./AccountSearchDialog";
import useStyles from "./Theme";
import { useThemeSwitcher } from "mui-theme-switcher";

const AccountSearch = ({ setAccountCode }) => {
  const classes = useStyles();
  const [accountCodes, setAccountCodes] = useState({});
  const [clickAccountCode, setClickAccountCode] = useState("");
  const [openAccountSearchDialog, setOpenAccountSearchDialog] = useState(false); //다이알로그 기본값 false 하면 안보임

  //검색버튼을 누르면 다이알로그가 열린다
  const buttonClickDialogOpen = () => {
    setOpenAccountSearchDialog(true);
  };

  //다이알로그가 닫힐때 실행
  const dialogClose = value => {
    setOpenAccountSearchDialog(false);
    if (value.data === undefined) return;

    //AccountLedgerSearch 에 선택한 accountCode 값 전달
    setAccountCode({
      accountCode: value.data[0].accountInnerCode,
    });
    setAccountCodes(value);
    setClickAccountCode(value.data[0].accountInnerCode);
  };

  // 칼럼정의
  const AccountGrid = [
    { headerName: "계정코드", field: "accountInnerCode" },
    { headerName: "계정명", field: "accountName" },
  ];

  const { dark } = useThemeSwitcher();

  return (
    <div Align="center" className={classes.margin}>
      <AccountSearchDialog open={openAccountSearchDialog} close={dialogClose} />
      <TextField
        id="accountCode"
        margin="normal"
        placeholder="계정코드"
        disabled={true}
        value={clickAccountCode}
      />
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => buttonClickDialogOpen()}
        value="accountCode"
      >
        검색
      </Button>
      <div
        className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
        style={{
          height: "100vh",
          //width: "100%",
          //paddingTop: "25px",
        }}
      >
        <AgGridReact
          columnDefs={AccountGrid}
          rowData={accountCodes.data}
          rowSelection="single"
          getRowStyle={function(param) {
            if (param.node.rowPinned) {
              return { "font-weight": "bold", background: "#CEFBC9" };
            }
            return { "text-align": "center" }; // bady 값 가운데정렬
          }}
          onGridReady={e => {
            //그리드 크기자동조절
            e.api.sizeColumnsToFit();
          }}
        />
      </div>
    </div>
  );
};
export default AccountSearch;
