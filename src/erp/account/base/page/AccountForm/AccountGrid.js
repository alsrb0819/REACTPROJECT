//********************************** 2020-08-26 정대현 추가 **********************************
import React, { useEffect, useState } from "react";
import useStyles from "erp/account/statement/page/AccountLedger/Theme";
import { AgGridReact } from "ag-grid-react";
import * as types from "../../reducer/BaseReducer";
import axios from "axios";
import { useDispatch } from "react-redux";
import Icon from "@material-ui/core/Icon";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useThemeSwitcher } from "mui-theme-switcher";

const AccountGrid = ({ accountInfo }) => {
  const data = accountInfo;
  console.log(data);

  const classes = useStyles();
  //const [data, setData] = useState();
  const [positionGridApi, setPositionGridApi] = useState();
  const dispatch = useDispatch(); //Redux 저장소에서 있는 함수를 데리고옴

  //===================== useEffect로 비동기적으로 동작  ====================

  //컴포넌트가 마운트 됐을 때 호출됨
  /* useEffect(() => {
    account(); // 함수호출
  }, []); */

  function accountList() {
    axios
      .get("http://localhost:8282/acc/base/getAccountList")
      /* .then(response => {
        setData(response.data);
      }) */
      .catch(e => {
        console.log(e);
      });
  }

  //========================== 그리드 객체 준비 ==========================
  const onGridReady = params => {
    setPositionGridApi(params.api);
    params.api.sizeColumnsToFit(); // 그리드 초기화 시 칼럼 사이즈 자동조절.
  }; // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.

  //========================== 그리드내용 ==========================
  const accountColumn = {
    columnDefs: [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        rowSelection: "multiple",
        rowMultiSelectionWhithClick: true,
        width: "23",
      },
      { headerName: "계정과목코드", field: "accountInnerCode", width: 80 },
      {
        headerName: "계정과목명",
        field: "accountName",
        width: 100,
        editable: true,
      },
      {
        headerName: "성격",
        field: "accountCharacter",
        width: 80,
        editable: true,
      },
      { headerName: "상태", field: "status", width: 80, hide: true },
    ],
  };

  const addBtn = () => {
    const newItem = NewRowData(); //새로운 row를 변수에담음
    positionGridApi.updateRowData({ add: [newItem], addIndex: "" }); // ag그리드 api로 그리드에 add 함
  };

  //추가할 컬럼 선언
  const NewRowData = () => {
    const rowCount = positionGridApi.getDisplayedRowCount(); // 그리드 행수를 카운트
    const lastAccountInnerCode = positionGridApi.getDisplayedRowAtIndex(
      rowCount - 1,
    ).data.accountInnerCode; // 마지막 accountInnerCode 가져옴
    const lastAccountCode = positionGridApi.getDisplayedRowAtIndex(rowCount - 1)
      .data.accountCode; // 필요한 정보들을 담는다.
    const ParentAccountInnerCode = positionGridApi.getDisplayedRowAtIndex(0)
      .data.parentAccountInnerCode;
    const AccountDivision = positionGridApi.getDisplayedRowAtIndex(0).data
      .accountDivision;
    const GroupCode = positionGridApi.getDisplayedRowAtIndex(0).data.groupCode;
    const Editable = positionGridApi.getDisplayedRowAtIndex(0).data.editable;

    var newAccountInnerCode = parseInt(lastAccountInnerCode) + 1;
    var newAccountCode = parseInt(lastAccountCode) + 1;

    function numberPad(str, width) {
      // newCode 맨 앞의 숫자가 0이면 공백으로 처리하기 때문에 0을 살려주는 함수
      str = str + "";
      return str.length >= str
        ? str
        : new Array(width - str.length + 1).join("0") + str;
    }

    newAccountInnerCode = numberPad(newAccountInnerCode, 4);
    newAccountCode = numberPad(newAccountCode, 4);

    let newData = {
      accountInnerCode: newAccountInnerCode,
      parentAccountInnercode: ParentAccountInnerCode,
      accountCode: newAccountCode,
      accountName: "",
      accountCharacter: "",
      accountDivision: AccountDivision,
      groupCode: GroupCode,
      editable: Editable,
      status: "insert",
    };
    console.log(newData);
    return newData;
  };

  ////편집 허용인 컬럼을 더블 클릭할 때 발생하는 이벤트.
  const rowCellChanged = e => {
    if (e.data.status === "insert") {
      return;
    } else {
      e.data.status = "update";
    }
  };

  //체크박스에 체크된 row만 삭제
  const deleteBtn = () => {
    const selectedData = positionGridApi.getSelectedRows(); //선택한 row
    //const selectedDataCount = selectedData.rowcount;
    console.log(selectedData);
    console.log(selectedData.length);
    console.log(":::::::::::::::" + JSON.stringify(selectedData.accountName));

    if (selectedData.length === 0) {
      // 선택된게 없으면.
      alert(" 삭제할 항목을 선택해주세요 . 🙏 ");
      return;
    } else if (selectedData.length > 1) {
      if (
        !window.confirm("⛔ 해당 계정과목 정보들을 삭제 하시겠습니까 ? ⛔ ")
      ) {
        alert("🧡💛💚💙💜🤎🖤🤍");
        return;
      } else {
        dispatch({
          division: "delete",
          type: types.BATCH_ACCOUNT_LIST_REQUEST,
          params: { accountInnerCode: selectedData[0].accountInnerCode },
        });
      }
    } else if (selectedData.length === 1) {
      if (
        !window.confirm(
          "⛔ 해당 " +
            selectedData[0].accountName +
            " 계정과목 정보를 삭제 하시겠습니까 ? ⛔ ",
        )
      ) {
        alert("🧡💛💚💙💜🤎🖤🤍");
        return;
      } else {
        dispatch({
          division: "delete",
          type: types.BATCH_ACCOUNT_LIST_REQUEST,
          params: { accountInnerCode: selectedData[0].accountInnerCode },
        });
      }
    }
    positionGridApi.updateRowData({ remove: selectedData }); // 선택된 row 삭제
    alert("삭제완료");
  };

  const saveBtn = () => {
    positionGridApi.selectAll(); // 그리드 전체 값
    const rows = positionGridApi.getSelectedRows(); // 그리드의 모든 값을 반환
    const rowsCount = positionGridApi.getDisplayedRowCount(); // 표시된 총 행 수를 반환

    if (!window.confirm(" 저장하시겠습니까 ? ")) {
      alert("💙 취소 완료 💙");
      return;
    } else {
      for (var i = 0; i < rowsCount; i++) {
        delete rows[i].errorCode;
        delete rows[i].errorMsg;
        delete rows[i].chk;
        if (rows[i].accountName === null && rows[i].accountCharacter === null) {
          alert("계정과목명과 성격을 입력해주고 다시 저장 버튼을 눌러주세요.");
          rows[i].status = "cancel";
          return;
        } else if (rows[i].accountName === null) {
          alert("계정과목명을 입력해주고 다시 저장 버튼을 눌러주세요.");
          rows[i].status = "cancel";
          return;
        } else if (rows[i].accountCharacter === null) {
          alert("성격을 입력해주고 다시 저장 버튼을 눌러주세요.");
          rows[i].status = "cancel";
          return;
        } else if (
          rows[i].accountName !== null &&
          rows[i].accountCharacter !== null
        ) {
          console.log("33333333333333  " + JSON.stringify(data));
        }
      }
      dispatch({
        division: "save",
        type: types.BATCH_ACCOUNT_LIST_REQUEST,
        params: { accountList: rows },
      });
      alert("💚 저장완료 💚");
      accountList(); //조회
    }
  };

  const onGridSizeChanged = params => {
    var gridWidth = document.getElementById("grid-wrapperr").offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  };

  const { dark } = useThemeSwitcher();

  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h4">계정과목</Typography>
          <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
          <Button
            style={{ margin: "5px" }}
            variant="contained"
            color="secondary"
            onClick={addBtn}
            startIcon={<Icon className="fa fa-plus-circle" />}
          >
            추가
          </Button>
          <Button
            style={{ margin: "5px" }}
            variant="contained"
            color="secondary"
            onClick={deleteBtn}
            startIcon={<DeleteOutlinedIcon />}
          >
            삭제
          </Button>
          <Button
            style={{ margin: "5px" }}
            variant="contained"
            color="secondary"
            onClick={saveBtn}
            startIcon={<ThreeSixtyIcon />}
          >
            저장
          </Button>
        </Toolbar>
      </AppBar>
      <div id="grid-wrapperr" style={{ width: "100%", height: "100%" }}>
        <div
          className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
          style={{
            height: "100vh",
            width: "100%",
            align: "center",
          }}
        >
          <AgGridReact
            columnDefs={accountColumn.columnDefs}
            rowData={data} // setData된 state를 결국 여기 넣어서 그리드에 표현함.
            rowSelection="multiple" //하나만 선택하거나 복수개를 선택할 수 있음
            onGridReady={onGridReady}
            getRowStyle={function(param) {
              return { "text-align": "center" };
            }}
            onCellEditingStarted={rowCellChanged}
            onGridSizeChanged={onGridSizeChanged}
          />
        </div>
      </div>
    </>
  );
};

export default AccountGrid;
