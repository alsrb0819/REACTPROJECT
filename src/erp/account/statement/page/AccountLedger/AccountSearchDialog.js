import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { AgGridReact } from "ag-grid-react";
import { SEARCH_ACCOUNT_LIST_REQUEST } from "../../reducer/StatementReducer";
import useStyles from "./Theme";
import { useThemeSwitcher } from "mui-theme-switcher";

const AccountSearchDialog = ({ open, close }) => {
  const [positionGridApi, setPositionGridApi] = useState([]);
  const data = useSelector(({ AccReducer }) => AccReducer.StatementReducer.accountList, []); //DB에서 받아온 값 을 그리드에뿌리려고 데꼬옴
  const dispatch = useDispatch();
  const classes = useStyles();

  const accountColumnDefs = [
    { headerName: "코 드", field: "accountInnerCode", width: 180 },
    { headerName: "계 정 과 목", field: "accountName", width: 210 },
  ];

  const handleClose = () => {
    close({
      data: positionGridApi.getSelectedRows(), // data는 클릭한 row의 정보이고,
      division: "accountDialog",
    });
  };

  const Close = () => {
    close({
      division: "accountDialog",
    });
  };

  const [accountName, setAccountName] = useState(""); // 계정이름이면
  const [accountCode, setAccountCode] = useState(""); // 계정코드면

  //onChange 이벤트
  const onChange = e => {
    let searchCode = e.target.value;
    console.log("isNaN(searchCode)", isNaN(searchCode)); //숫자 여부 판단
    if (isNaN(searchCode)) {
      setAccountName(searchCode);
      setAccountCode("undefined");
    } else {
      setAccountName("undefined");
      setAccountCode(searchCode);
    }
  };

  //검색 버튼누르면 액션타입명에맞는 비동기함수가 호출된다
  const selectData = () => {
    dispatch({
      type: SEARCH_ACCOUNT_LIST_REQUEST,
      params: {
        accountName: accountName,
        accountCode: accountCode,
      },
    });
  };
  console.log("data", data);
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      selectData();
    }
  };

  const { dark } = useThemeSwitcher();

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle id="simple-dialog-title" Align="center">
        계 정 과 목
      </DialogTitle>
      <DialogContent dividers>
        <List>
          <div Align="center" className={classes.margin}>
            <TextField
              margin="normal"
              placeholder="계정코드"
              onChange={onChange}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              //size="large"
              color="primary"
              startIcon={<SearchIcon />} //아이콘
              onClick={selectData}
            >
              검색
            </Button>
          </div>
          <div
            className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
            style={{
              height: "300px",
              width: "100%",
              paddingTop: "8px",
            }}
          >
            <AgGridReact
              columnDefs={accountColumnDefs} //컬럼명
              rowData={data} // 뿌릴 data
              rowSelection="single" // 하나만 선택 가능.
              getRowStyle={param => {
                return { "text-align": "center" }; //body 가운데 정렬
              }}
              onGridReady={params => setPositionGridApi(params.api)}
              onCellClicked={handleClose} // cell을 클릭하면, handleClose가 실행된다.
            />
          </div>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={Close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountSearchDialog;
