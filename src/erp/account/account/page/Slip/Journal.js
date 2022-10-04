import React, { useState, useEffect } from "react";
import useStyles from "./Theme";
import SearchAccountDialog from "erp/account/statement/page/AccountLedger/AccountSearchDialog";
import CustomerDialog from "./Dialog/CustomerDialog";
import { AgGridReact } from "ag-grid-react";
import { Button, Box, AppBar, Toolbar, Typography } from "@material-ui/core";
import OpenDialog from "./SalaryAndDelivery/OpenDialog";
import { useThemeSwitcher } from "mui-theme-switcher";
//=================================================== 2020-09-14 조편백 일반전표 분개 =========================================
//=================================================== 2020-11-18 박민호 일반전표 분개 수정=========================================
const Journal = props => {
  const theme = useStyles();
  var [openSearchAccountDialog, setOpenSearchAccountDialog] = useState(false); //계정과목
  var [deadlineDialog, setDeadlineDialog] = useState(false); //임금/납품다이얼로그
  var [openCustomerDialog, setOpenCustomerDialog] = useState(false); //거래처 다이알로그
  const [journalRow, setJournalRow] = React.useState(); //분개그리드
  const [accountRow, setAccountRow] = useState(""); //계정별원장 다이알로그 상태값
  const [customerRow, setCustomerRow] = useState(""); //거래처 다이알로그 상태값
  const [nodeId, setNodeId] = useState(""); //분개그리드 row의indexid
  const [price, setPrice] = useState(""); //분개 그리드 row 가격 상태값
  const [salaryRow, setSalaryRow] = useState(""); //임금 다이알로그 상태값
  const [divsion, setDivsion] = useState(""); // 다이알로그 구분
  const [salaryInsert, setSalaryInsert] = useState(""); // 다이알로그 구분
  //=================================================== ag Grid 초기화 시 실행 =========================================
  const onGridReady = params => {
    console.log("ddddd");
    setJournalRow(params.api); //동적으로변하는 분개그리드 값 할당
    params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
  };
  console.log("divsion", divsion);
  //=================================================== Grid  =========================================
  const column = {
    columnDefs: [
      { width: "50", headerCheckboxSelection: true, checkboxSelection: true }, //체크박스
      { headerName: "분개일련번호", field: "journalNo", editable: true },
      { headerName: "계정코드", field: "accountCode" },
      { headerName: "계정명", field: "accountName" },
      {
        headerName: "대차구분",
        field: "balanceDivision",
        editable: true,
        cellEditor: "agSelectCellEditor", //콤보 생성
        //콤보List
        cellEditorParams: {
          values: ["대변", "차변"],
        },
      },
      { headerName: "거래처코드", field: "customerCode" },
      { headerName: "거래처명", field: "customerName", hide: true },
      {
        headerName: "차변",
        field: "leftDebtorPrice",
        editable: true,
        //valueFormatter:' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
      },
      {
        headerName: "대변",
        field: "rightCreditsPrice",
        editable: true,
        //valueFormatter:' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
      },
    ],
    autoGroupColumnDef: { minWidth: 100 },
  };
  //===============================================월급 자동 =================================================

  const deadlineOpen = () => {
    setDeadlineDialog(true);
  };
  //=================================================== 분개추가버튼  =========================================
  const addBtn = () => {
    const newItem = NewRowData(); //새로운 row를 변수에담음
    journalRow.updateRowData({ add: [newItem], addIndex: "" }); // ag그리드 api로 그리드에 add 함
  };
  //추가할 컬럼 선언
  const NewRowData = () => {
    let newData = {
      journalNo: "NEW",
      accountCode: "",
      accountName: "",
      balanceDivision: "대변",
      customerCode: "",
      customerName: "",
      leftDebtorPrice: "0",
      rightCreditsPrice: "0",
    };
    return newData;
  };
  //=================================================== 분개삭제버튼  =========================================
  const deleteBtn = () => {
    const journalRows = journalRow.getSelectedRows(); // 그리드의 모든 값을 반환
    if (journalRows.length === 0) {
      alert("삭제할 분개를 선택해주세요.");
      return;
    } else if (
      props.silpRow[0].slipStatus === "승인" ||
      props.silpRow[0].slipStatus === "반려"
    ) {
      alert("승인상태 [ " + props.silpRow[0].slipStatus + " ]  : 삭제 불가능 ");
      return; //전표그리드에 승인상태를 유효성검사로 검사함
    } else if (journalRows[0].journalNo === "NEW") {
      journalRow.updateRowData({ remove: journalRows }); // 선택된 row 삭제
      return;
    } else if (!window.confirm(" 삭제 ? ")) {
      alert(" 취소되었습니다. ");
      return;
    } else {
      const slipNo = journalRows[0].slipNo; //걍 변수에담음
      const journalNo = journalRows[0].journalNo; //걍 변수에담음
      props.handleDeleteJournal(slipNo, journalNo); //삭제 SAGA
      journalRow.updateRowData({ remove: journalRows }); // 선택된 row 삭제
      alert(" 삭제 ");
    }
  };
  //=================================================== 분개저장버튼  =========================================
  const saveBtn = () => {
    const journalRows = journalRow.getSelectedRows(); // 그리드의 모든 값
    const rowsCount = journalRow.getDisplayedRowCount(); // 표시된 총 행 수를 반환

    var leftDebtorPrice = 0;
    var rightCreditsPrice = 0;
    journalRow.stopEditing(); //편집 중지
    journalRow.selectAll(); // 그리드 전체 값 Read

    if (rowsCount === 0 || rowsCount === 1) {
      alert(" 분개를 작성해주세요 ");
      return;
    }
    console.log("rowsCount", rowsCount);

    if (journalRows.length !== rowsCount) {
      alert("체크박스 확인바랍니다");
      return;
    }
    for (var ii = 0; ii < journalRows.length; ii++) {
      console.log(journalRows[ii].leftDebtorPrice);
      leftDebtorPrice += parseInt(journalRows[ii].leftDebtorPrice); //대변차변 합계 유효성검사
      rightCreditsPrice += parseInt(journalRows[ii].rightCreditsPrice);
      console.log("journalRows[ii].customerCode", journalRows[ii].customerCode);
      if (
        journalRows[ii].accountName === null ||
        journalRows[ii].customerCode === null ||
        journalRows[ii].customerCode === "" ||
        journalRows[ii].accountName === "" ||
        journalRows[ii].balanceDivision === ""
      ) {
        alert(" 빈칸을 입력해주세요 . ");
        return;
      }
      //1 째 row 가있는데 2번째 row가 없으면?
    }
    if (rowsCount === 1) {    
        alert(journalRows[0].balanceDivision + "만 있으면 안됨");
        return;
        //분개는 차변 1 개 대변 1개 가세트임 중복되면 return
      
      //1.2 번째 ROW 가 있으면 차변대변 금액비교
    } else if (
      journalRows[0].balanceDivision === journalRows[1].balanceDivision
    ) {
      alert(
        "대차구분에 [" +
          journalRows[0].balanceDivision +
          "]  이 중복됩니다. 수정해주세요.",
      );
      return;
    } else if (leftDebtorPrice !== rightCreditsPrice) {
      console.log(leftDebtorPrice);
      console.log(rightCreditsPrice);
      alert(
        " [ 차변금액 : " +
          leftDebtorPrice +
          " ]  [대변금액 : " +
          rightCreditsPrice +
          " ] 금액이 일치하지않습니다.",
      );
      return;
    }
    //전표가 승인 or 반려면 분개 수정 불가능
    if (
      props.silpRow[0].slipStatus === "승인" ||
      props.silpRow[0].slipStatus === "반려"
    ) {
      alert("승인상태 [ " + props.silpRow[0].slipStatus + " ]  : 수정 불가능 ");
      return;
    } else if (!window.confirm(" 저 장 ? ")) {
      alert(" 취 소 ");
      return;
      //전표 , 분개 번호 생성 insert
    } else if (props.silpRow[0].slipNo === "NEW") {
      console.log("insert");
      let slipData = props.silpRow[0];
      slipData.journalList = journalRows; // {전표 ,분개키값:[{분개1},{분개2},{분개3}...]}
      //journalList 로 한 이유는 뒷단 ..to/SlipBean 에 ArrayList<JournalBean> journalList; 라고적혀있음 (journalList 키값에 분개 List가 할당됨

      if (!!props.error) {
        alert("ERROR : " + props.error);
      }
      if (!!props.journalList) {
        if (divsion === "Salary") {
          //임금 마감 Y작업
          console.log("salaryInsert", salaryInsert);
          for (var i = 0; i < salaryInsert.length; i++) {
            salaryInsert[i].finalizeStatus = "Y";
          }
          props.handlCloseSalaryWithSlipRequest(salaryInsert);
        } else if (divsion === "Delivery") {
          //납품 마감 Y작업
          console.log("salaryInsert", salaryInsert);
          for (var i = 0; i < salaryInsert.length; i++) {
            salaryInsert[i].finalizeStatus = "Y";
          }
          console.log("salaryInsert:::::::::::::::::::::::", salaryInsert);
          props.handlCloseDeliveryWithStart(salaryInsert);
        } 
        
        
        // 발주 마감하면 ORDER_INFO / order_slip_status => 'Y'로 바꾸기
        
        else if (divsion === "Order") {
          console.log("salaryInsert", salaryInsert);
          for (var i = 0; i < salaryInsert.length; i++) {
            salaryInsert[i].orderSlipStatus = "Y";
          }
          console.log("salaryInsert:::::::::::::::::::::::", salaryInsert);
          props.handlCloseOrderWithStart(salaryInsert);
        }





        alert(" 완 료 ");
      }
      slipData.journalDeadline = salaryInsert;
      if (salaryInsert === "") {
        slipData.journalDeadline = [{ 0: 0 }];
      }
      slipData.divsion = divsion;
      console.log("slipData", slipData);
      props.handleSaveJournal(slipData); //저장 db
      //전표, 분개 update
    } else if (props.silpRow[0].slipNo !== "NEW") {
      console.log("update");
      props.handleUpdateJournal(journalRows); //업데이트 db
      //console.log(":::" + props.journalList)
      if (!!props.error) {
        alert("ERROR : " + props.error);
      }
      if (!!props.journalList) {
        alert(" 완 료 ");
      }
    }
  };
  //=================================================== cell event  =========================================
  //=================================================대변 차변 계정과목 금액  유효성 검사  합계잔액시산표 금액 불일치 때문 2020-11-13 수정 ==========================
  // ==============================================그리드 셀 하나 Auto============================
  const onCellClicked = e => {
    props.handleSearchJournalDetail(e.data.journalNo); //분개상세조회
    //분개버튼 활성화
    if (
      props.silpRow[0].slipStatus !== "승인" ||
      props.silpRow[0].slipStatus !== "반려"
    ) {
      props.setVisibleState(false);
    }

    //계정별원장
    if (e.colDef.field === "accountCode" || e.colDef.field === "accountName") {
      setNodeId(e.rowIndex);
      setOpenSearchAccountDialog(true);

      if (
        e.colDef.field.value === undefined ||
        e.colDef.field.value === undefined
      ) {
        if (e.rowIndex === 0) {
          if (journalRow.getDisplayedRowCount() === 1) {
            const newItem = NewRowData(); //새로운 row를 변수에담음
            journalRow.updateRowData({ add: [newItem], addIndex: "" }); // ag그리드 api로 그리드에 add 함
            let rowChange = journalRow.getRowNode(e.rowIndex + 1); //자동 컬럼추가
            rowChange.setDataValue("balanceDivision", "차변");
            return;
          }
        }
      }
      //거래처
    } else if (
      e.colDef.field === "customerCode" ||
      e.colDef.field === "customerName"
    ) {
      setNodeId(e.rowIndex);
      setOpenCustomerDialog(true);
    } else if (e.colDef.field === "balanceDivision") {
      setNodeId(e.rowIndex);
      //let test1=journalRow.getRowNode(e.rowIndex+1).i

      if (e.rowIndex + 2 === journalRow.getDisplayedRowCount()) {
        if (e.data.balanceDivision === "대변") {
          let balanceDivision = journalRow.getRowNode(e.rowIndex + 1);
          balanceDivision.setDataValue("balanceDivision", "차변");
          return;
        } else {
          let balanceDivision1 = journalRow.getRowNode(e.rowIndex + 1);
          balanceDivision1.setDataValue("balanceDivision", "대변");
          return;
        }
      }
    } else if (
      e.colDef.field === "leftDebtorPrice" ||
      e.colDef.field === "rightCreditsPrice"
    ) {
      setNodeId(e.rowIndex);
      if (journalRow.getRowNode(e.rowIndex).data.balanceDivision === "대변") {
        if (e.colDef.field === "leftDebtorPrice") {
          alert("차변기입금지");
          return;
        }
      } else if (
        journalRow.getRowNode(e.rowIndex).data.balanceDivision === "차변"
      ) {
        if (e.colDef.field === "rightCreditsPrice") {
          alert("대변기입금지");
          return;
        }
      }
    }
  };
  //========================================임금/납품 다이얼로그 CLOSED============================================
  const handleOpenTotal = value => {
    setDeadlineDialog(false);
    if (value.newJournal === undefined) {
      return;
    }
    if (value.division === "Delivery") {
      setDivsion(value.division);
      setSalaryRow(value.newJournal); //납품 Row값을 set
      setSalaryInsert(value.deliveryRows);
    } else if (value.division === "Salary") {
      setDivsion(value.division);
      setSalaryRow(value.newJournal); //임금 Row값을 set
      setSalaryInsert(value.salaryRows);
    } else if (value.division === "Order") {
      setDivsion(value.division);
      setSalaryRow(value.newJournal); //발주 Row값을 set
      setSalaryInsert(value.orderInfoRows);
    }
  };
  //=================================================== 계정별원장 다이알로그 CLOSED  =========================================
  const handleAccountClose = value => {
    setOpenSearchAccountDialog(false);
    if (value.data === undefined) {
      return;
    } else {
      setAccountRow(value.data); //계정별원장 Row값을 set
    }
  };
  //=================================================== 거래처 다이알로그 CLOSED  =========================================
  const handleCustomerClose = value => {
    setOpenCustomerDialog(false);
    if (value.data === undefined) {
      return;
    } else {
      console.log("거래처 : " + JSON.stringify(value.data));
      setCustomerRow(value.data); //거래처 Row값을 set
    }
  };
  //================================================== 계정별원장 렌더링  ===================================================
  useEffect(() => {
    // accountDialog 에 클릭한 row 값
    if (accountRow[0] !== undefined) {
      let itemsToUpdate = [];

      // rowNode:분개그리드의 rows , index:분개그리드의 index
      journalRow.forEachNodeAfterFilterAndSort(function(rowNode, index) {
        // 분개그리드 indexId  !== 클릭한 셀 indexId ( 결국 클릭한 셀에 index에 값을 insert 할려고 비교연산함 )
        if (index !== nodeId) {
          if (nodeId + 1 === rowNode.childIndex) {
            let AccountData = rowNode.data;
            AccountData.accountCode = accountRow[0].accountInnerCode; //계정코드
            AccountData.accountName = accountRow[0].accountName; //계정명
            itemsToUpdate.push(AccountData); // 배열에 집어넣고,
          }
          return;
        } else {
          let AccountData = rowNode.data; // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
          AccountData.accountCode = accountRow[0].accountInnerCode; //계정코드
          AccountData.accountName = accountRow[0].accountName; //계정명
          itemsToUpdate.push(AccountData); // 배열에 집어넣고,
        }
      });
      journalRow.updateRowData({ update: itemsToUpdate }); // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
    }
  }, [accountRow]); // accountRow 값이 변할 때마다  useEffect를 실행
  //================================================================================================================
  //================================================== 거래처 렌더링  ===================================================
  useEffect(
    onCellClicked => {
      if (customerRow[0] !== undefined) {
        // customerDialog 에 클릭한 row 값
        let itemsToUpdate = [];
        // rowNode:분개그리드의 rows , index:분개그리드의 index
        journalRow.forEachNodeAfterFilterAndSort(function(rowNode, index) {
          // 분개그리드 indexId  !== 클릭한 셀 indexId ( 결국 클릭한 셀에 index에 값을 insert 할려고 비교연산함 )
          if (index !== nodeId) {
            if (nodeId + 1 === rowNode.childIndex) {
              // 대변 차변 자동 설정 위함
              let CustomerData = rowNode.data; // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
              CustomerData.customerCode = customerRow[0].customerCode; //계정코드
              CustomerData.customerName = customerRow[0].customerName; //계정명
              itemsToUpdate.push(CustomerData); //
            }
            return;
          }
          let CustomerData = rowNode.data; // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
          CustomerData.customerCode = customerRow[0].customerCode; //계정코드
          CustomerData.customerName = customerRow[0].customerName; //계정명
          itemsToUpdate.push(CustomerData); // 배열에 집어넣고,
        });
        journalRow.updateRowData({ update: itemsToUpdate }); // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
      }
    },
    [customerRow],
  ); // customerRow 값이 변할 때마다  useEffect를 실행
  //=========================================임금 랜더링====================================================================
  useEffect(() => {
    if (salaryRow[0] !== undefined) {
      for (var i = 0; i < salaryRow.length; i++) {
        journalRow.updateRowData({ add: [salaryRow[i]], addIndex: "" }); // ag그리드 api로 그리드에 add 함
      }
    }
  }, [salaryRow]);
  //=================================================================================================================
  useEffect(() => {
    console.log(journalRow + "###");
  }, [journalRow]);

  const { dark } = useThemeSwitcher();

  return (
    <>
      <div>
        <OpenDialog open={deadlineDialog} close={handleOpenTotal} />
        <SearchAccountDialog
          open={openSearchAccountDialog}
          close={handleAccountClose}
        />
        <CustomerDialog open={openCustomerDialog} close={handleCustomerClose} />
        <div align="right" className={theme.root}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="h4">분개</Typography>
              <Typography variant="h6" className={theme.title} />
              <Button
                className={theme.menuButton}
                variant="contained"
                onClick={deadlineOpen}
                color="secondary"
                disabled={props.visibleState}
              >
                발주/납품 마감신청
              </Button>
              <Button
                className={theme.menuButton}
                variant="contained"
                onClick={addBtn}
                color="secondary"
                disabled={props.visibleState}
              >
                분개추가
              </Button>
              <Button
                className={theme.menuButton}
                variant="contained"
                onClick={deleteBtn}
                color="secondary"
              >
                분개삭제
              </Button>
              <Button
                className={theme.menuButton}
                variant="contained"
                onClick={saveBtn}
                color="secondary"
              >
                분개저장
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
          suppressChangeDetection="false"
          rowStyle={{ "text-align": "center" }}
          style={{
            height: "215px",
            width: "100%",
            //paddingTop: "25px",
            float: "center",
          }}
          cellStyle={{ textAlign: "center" }}
        >
          <AgGridReact
            columnDefs={column.columnDefs} //정의된 컬럼
            rowData={props.journalList}
            rowSelection="multiple" //하나만 선택하거나 복수개를 선택할 수 있음
            onGridReady={onGridReady} //onload 이벤트와 유사한 것
            autoGroupColumnDef={column.autoGroupColumnDef}
            suppressAggFuncInHeader={true}
            enableCellChangeFlash={true}
            getRowStyle={function(param) {
              return { "text-align": "center" };
            }} //body 가운데 정렬
            onCellClicked={onCellClicked} //셀 클릭
          />
        </div>
      </div>
    </>
  );
};
export default Journal;
