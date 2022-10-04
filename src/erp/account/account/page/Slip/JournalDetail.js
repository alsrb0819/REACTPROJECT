import React, { useState, useEffect } from "react";
import useStyles from "./Theme";
import { AgGridReact } from "ag-grid-react";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import FinancialDialog from "./Dialog/FinancialDialog";
import { useThemeSwitcher } from "mui-theme-switcher";
import axios from "axios";
//=================================================== 2020-09-14 조편백 일반전표 분개상세 =========================================
const JournalDetail = props => {
  const theme = useStyles(); //CSS
  const [journalDetailData, setJournalDetailData] = useState([]); //분개상세그리드 값
  const [nodeId, setNodeId] = useState(""); //분개상세그리드 row의indexid
  const [financialRow, setFinancialRow] = useState(""); //금융기관 다이알로그 상태값
  const [deptRow , setDeptRow] = useState(""); //부서 다이알로그 상태값
  var [openSearchFinancialDialog, setOpenSearchFinancialDialog] = useState(
    false,
  ); //금융기관 다이알로그
  var divisionCode1=null;
  //var [divisionCode, setdivisionCode] = useState("");
  const [datePickerr, setdatePicker] = useState("");
  var [data, setData] = useState(null);
  //=================================================== ag Grid 초기화 시 실행 =========================================
  const onGridReady = params => {
    // console.log(params);
    setJournalDetailData(params.api); //분개상세그리드 동적값 SET
    params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
    // params.columnApi.autoSizeColumns([column])
  };
  //=================================================== cell event  =========================================
  const onCellClicked = e => {
    e.api.sizeColumnsToFit(); //그리드 사이즈자동조절

    //금융기관 이면 Dialog 열기
      if(e.data.accountControlType === 'SELECT' || 
        e.data.accountControlType ==='SEARCH'){
      setNodeId(e.rowIndex);
      divisionCode1=e.data.accountControlName;
      console.log(divisionCode1)
      FinancialList();
      setOpenSearchFinancialDialog(true); //금융기관
      }
  };
  function FinancialList() {
    axios.get("http://localhost:8282/acc/base/getDetailCodeList",
        { params: { divisionCodeNo: divisionCode1 } }
    ).then(response => {
        setData(response.data.detailCodeList);
        console.log("data" + data);
    }).catch(e => { console.log(e); });
}
  //=================================================== Grid  =========================================
  const column = {
    columnDefs: [
      { headerName: "", field: "check", width: 100, checkboxSelection: true },
      { headerName: "분개번호", field: "journalDetailNo" },
      { headerName: "계정명", field: "accountControlName" },
      { headerName: "계정내용", field: "accountControlType" },
      {
        headerName: "상세내용",
        field: "journalDescription",
        editable: true,
        cellEditor: getDatePicker(), //달력
        cellEditorParams: function(params) {
          //선택한 셀마다 동적 값 얻기
          setdatePicker(params.data.accountControlName);
        },
      },
    ],
    //  components: { datePicker: getDatePicker() },
  };

  //ag그리드 datePicker
  function getDatePicker(e) {
    if (datePickerr === "만기일") {
      function datePicker() {}
      datePicker.prototype.init = function(paramss) {
        this.eInput = document.createElement("input");
        this.eInput.setAttribute("type", "date");
        this.cell = paramss.eGridCell;
        this.oldWidth = this.cell.style.width;
        this.cell.style.width = "200px";
        this.eInput.value = paramss.value;
      };
      datePicker.prototype.getGui = function() {
        return this.eInput;
      };
      datePicker.prototype.afterGuiAttached = function() {
        this.eInput.focus();
        this.eInput.select();
      };
      datePicker.prototype.getValue = function() {
        this.cell.style.width = this.oldWidth;
        return this.eInput.value;
      };

      return datePicker;
    } else {
      return;
    }
  }

  //=================================================== 분개상세저장버튼  =========================================
  const saveBtn = () => {
    journalDetailData.stopEditing(); //편집 중지
    journalDetailData.selectAll();
    const SaveJournalDetailList = journalDetailData.getSelectedRows(); // 그리드의 모든 값

    if (SaveJournalDetailList.length === 0) {
      alert("분개상세내용이 없습니다. 분개상세내용을 조회해주세요.");
    } else if (!window.confirm(" 저 장 ?")) {
      alert(" 취 소 ");
      return;
    } else {
      props.handlSaveJournalDetailList(SaveJournalDetailList);
      alert(" 저 장 완 료 ");
    }
  };
  //=================================================== 금융기관 다이알로그 CLOSED  =========================================
  const handleFinancialClose = value => {
    setOpenSearchFinancialDialog(false);
    if (value.data === undefined) {
      return;
    } else {
      setFinancialRow(value.data); //금융기관 Row값을 set
    }
  };

  //==================================================금융기관 상세내용 렌더링  ===================================================
  useEffect(() => {
    // accountDialog 에 클릭한 row 값
    if (financialRow[0] !== undefined) {
      let itemsToUpdate = [];
      // rowNode:분개상세그리드의 rows , index:분개상세그리드의 index
      journalDetailData.forEachNodeAfterFilterAndSort(function(rowNode, index) {
        // 분개상세그리드 indexId  !== 클릭한 셀 indexId ( 결국 클릭한 셀에 index에 값을 insert 할려고 비교연산함 )
        if (index !== nodeId) {
          return;
        }
        let FinancialData = rowNode.data; // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
        FinancialData.journalDescription = financialRow; //계정코드
        itemsToUpdate.push(FinancialData); // 배열에 집어넣고,
      });
      journalDetailData.updateRowData({ update: itemsToUpdate }); // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
    }
  }, [financialRow]); // accountRow 값이 변할 때마다  useEffect를 실행
    //==================================================부서 상세내용 렌더링 (수정중 여기 지금 ) ===================================================
    useEffect(() => {
      // accountDialog 에 클릭한 row 값
      if (deptRow[0] !== undefined) {
        let itemsToUpdate = [];
        // rowNode:분개상세그리드의 rows , index:분개상세그리드의 index
        journalDetailData.forEachNodeAfterFilterAndSort(function(rowNode, index) {
          // 분개상세그리드 indexId  !== 클릭한 셀 indexId ( 결국 클릭한 셀에 index에 값을 insert 할려고 비교연산함 )
          if (index !== nodeId) {
            return;
          }
          let DeptData = rowNode.data; // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
          DeptData.journalDescription = deptRow; //계정코드
          itemsToUpdate.push(DeptData); // 배열에 집어넣고,
        });
        journalDetailData.updateRowData({ update: itemsToUpdate }); // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
      }
    }, [deptRow]); // accountRow 값이 변할 때마다  useEffect를 실행
  //=================================================================================================================

  const { dark } = useThemeSwitcher();

  return (
    <>
      <div>
        <FinancialDialog
          open={openSearchFinancialDialog}
          divisionCodeData={data}
          close={handleFinancialClose}
        />
        
        <div align="right" className={theme.root}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="h4">분개상세</Typography>
              <Typography variant="h6" className={theme.title} />
              <Button variant="contained" color="secondary" onClick={saveBtn}>
                분개상세 저장
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <div
          className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
          skipHeaderOnAutoSize="true"
          enableColResize="true"
          enableSorting="true"
          enableFilter="true"
          enableRangeSelection="true"
          rowStyle={{ "text-align": "center" }}
          style={{
            height: "200px",
            width: "100%",
            //paddingTop: "25px",
            float: "center",
          }}
          cellStyle={{ textAlign: "center" }}
        >
          <AgGridReact
            columnDefs={column.columnDefs} //정의된 컬럼
            rowData={props.journalDetailList} //Reduce에서 받아온 데이터
            rowSelection="single" //하나만 선택하거나 복수개를 선택할 수 있음
            onGridReady={onGridReady} //onload 이벤트와 유사한 것
            getRowStyle={function(param) {
              return { "text-align": "center" };
            }} //body 가운데 정렬
            onCellClicked={onCellClicked} //셀클릭
            //singleClickEdit={true} //편집 한번클릭
            onCellEditingStarted={event => {
              console.log("223134214" + event);
              //event.api.sizeColumnsToFit();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default JournalDetail;
