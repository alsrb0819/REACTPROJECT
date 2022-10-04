import React, { useEffect, useState } from "react";
import useStyles from "erp/account/account/page/Slip/Theme";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import OpenCodeDialog from "./Dialog/OpenCodeDialog";
import {
  SEARCH_NON_CURRENT_REQUEST,
  DELETE_NON_CURRENT_START,
} from "../../reducer/AccountReducer";
import { List, AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import $ from "jquery";
import jQuery from "jquery";
import { useThemeSwitcher } from "mui-theme-switcher";
/*##################################### 2020-11-20납품현황 박민호 #######################################*/
window.$ = window.jQuery = jQuery;
const NonCurrentAssetRegister = props => {
  const [dialogData, setDialogData] = useState("");
  const [positionGridApi, setPositionGridApi] = React.useState();
  var [openCodeDialog, setopenCodeDialog] = useState(false);
  const data = useSelector(({ AccReducer }) => AccReducer.AccountReducer.nonCurrentAsset, []); //DB에서 받아온 값 을 그리드에뿌리려고 데꼬옴
  const theme = useStyles();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [visibleState, setVisibleState] = useState(true);

  const onGridReady = params => {
    setPositionGridApi(params.api);
    params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
  };
  const column = {
    accountColumnDefs: [
      { headerName: "", field: "check", width: 50, checkboxSelection: true },
      { headerName: "계정코드", field: "accountCode", width: 80 },
      { headerName: "계정명", field: "accountName", width: 135 },
      { headerName: "자산코드", field: "assetCode", width: 140 },
      { headerName: "자산명", field: "assetName", editable: true, width: 150 },
      {
        headerName: "취득일",
        field: "progress",
        editable: true,
        width: 100,
        cellEditor: "datePicker",
      },
      { headerName: "처리여부", field: "finalizeStatus", width: 100 },
    ],
    autoGroupColumnDef: { minWidth: 100 },
  };
  function getDatePicker() {
    function Datepicker() {}
    Datepicker.prototype.init = function(params) {
      this.eInput = document.createElement("input");
      this.eInput.value = params.value;
      this.eInput.classList.add("ag-input");
      this.eInput.style.height = "100%";

      $(this.eInput).datepicker({ dateFormat: "yy/mm/dd" });
    };
    Datepicker.prototype.getGui = function() {
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function() {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function() {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function() {};
    Datepicker.prototype.isPopup = function() {
      return false;
    };
    return Datepicker;
  }

  const openCode = () => {
    setopenCodeDialog(true);
  };
  const handleOpenCode = value => {
    setopenCodeDialog(false);
    console.log("##########################", value);
    if (value.data === undefined || value.data === null) {
      return;
    } else {
      setDialogData(value.data);
    }
  };
  const onCellClicked = params => {
    const selectedRows = params.api.getSelectedRows(); //선택한 전표 Grid row 1줄을 들고옴

    console.log("selectedRows", selectedRows);
    if (selectedRows[0].assetName !== "" && selectedRows[0].progress !== "") {
      props.setVisibleState(false);
    }
    props.setNonCurrentAsst(selectedRows);
  };

  const addColum = () => {
    setVisibleState(true);
    positionGridApi.updateRowData({ add: [NewRowData()], addIndex: "" });
  };
  const NewRowData = () => {
    let newData = {
      accountCode: dialogData[0].accountCode,
      accountName: dialogData[0].accountName,
      assetCode: "자동생성",
      assetName: "",
      progress: "",
      finalizeStatus: "진행",
    };
    return newData;
  };
  const removeColum = () => {
    let Noncarow = positionGridApi.getSelectedRows();
    if (Noncarow.length === 0) {
      alert("삭제할 그리드 선택 바랍니다");
      return;
    }
    dispatch({
      type: DELETE_NON_CURRENT_START,
      param: {
        assetCode: Noncarow[0].assetCode,
      },
    });
    positionGridApi.updateRowData({ remove: Noncarow });
  };

  useEffect(() => {
    if (dialogData[0] !== undefined) {
      console.log("@@@@@@@@#########");
      positionGridApi.selectAll(); // 그리드를 모두 선택해라.
      const allData = positionGridApi.getSelectedRows(); // 선택한 그리드 데이타 들고온나.
      positionGridApi.updateRowData({ remove: allData }); // 데이터 전부 지아라.

      dispatch({
        type: SEARCH_NON_CURRENT_REQUEST,
        params: {
          accountName: dialogData[0].accountName,
          accountCode: dialogData[0].accountCode,
        },
      });
      setRowData(data);
      setVisibleState("");
    }
  }, [dialogData]);

  const { dark } = useThemeSwitcher();

  return (
    <div>
      <OpenCodeDialog open={openCodeDialog} close={handleOpenCode} />
      <List>
        <div className={theme.root}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="h4">고정자산</Typography>
              <Typography variant="h6" className={theme.title}></Typography>
              <Button
                className={theme.menuButton}
                variant="contained"
                color="secondary"
                onClick={openCode}
              >
                조회
              </Button>
              <Button
                className={theme.menuButton}
                variant="contained"
                color="secondary"
                onClick={addColum}
                disabled={visibleState}
              >
                추가
              </Button>
              <Button
                className={theme.menuButton}
                variant="contained"
                color="secondary"
                onClick={removeColum}
              >
                삭제
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <div
          className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
          style={{
            height: "340px",
            width: "100%",
            //paddingTop: "8px",
          }}
        >
          <AgGridReact
            columnDefs={column.accountColumnDefs} //컬럼명
            rowSelection="single"
            getRowStyle={function(param) {
              return { "text-align": "center" };
            }} //body 가운데 정렬
            onGridReady={onGridReady}
            autoGroupColumnDef={column.autoGroupColumnDef}
            onGridSizeChanged={event => {
              event.api.sizeColumnsToFit();
            }}
            components={{ datePicker: getDatePicker() }}
            rowData={data}
            onCellClicked={onCellClicked} //셀 한번클릭
            //domLayout={"autoHeight"}
          />
        </div>
      </List>
    </div>
  );
};

export default NonCurrentAssetRegister;
