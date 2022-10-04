import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useThemeSwitcher } from "mui-theme-switcher";

const GeneralAccountLedgerGrid = props => {
  const data = useSelector(
    ({ AccReducer }) => AccReducer.AccountReducer.generalAccountLedgerList,
  );

  // const [journalDetailDialogOpen, setJournalDetailDialogOpen] = useState(false);
  // const [journalNo, setjournalNo] = useState("");

  // const handleClose = () => {
  //   setJournalDetailDialogOpen(false);
  // };

  // const onCellClicked = id => {
  //   setJournalDetailDialogOpen(true);
  //   setjournalNo(id.data.journalNo);
  // };

  const JournalFoamColumnDefs = [
    { headerName: "일자", field: "reportingDate" },
    { headerName: "회계계정", field: "accountName" },
    {
      headerName: "차변금액",
      field: "leftDebtorPrice",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "대변금액",
      field: "rightCreditsPrice",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    { headerName: "거래처", field: "customerName" },
    { headerName: "적요", field: "expenseReport" },
  ];

  const onGridSizeChanged = params => {
    var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
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
      {/* <GeneralAccountLedgerDialog
        journalNo={journalNo}
        open={journalDetailDialogOpen}
        onClose={handleClose}
      /> */}
      <div id="grid-wrapper" style={{ width: "100%" }}>
        <div
          className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
          style={{
            //height: "60vh",
            wieth: "100%",
          }}
        >
          <AgGridReact
            domLayout={"autoHeight"}
            columnDefs={JournalFoamColumnDefs}
            rowData={data}
            rowSelection="single"
            //onCellClicked={onCellClicked}
            onGridReady={params => {
              props.setGeneralAccountLedgerGrid(params.api);
              params.api.sizeColumnsToFit();
              //params.api.setQuickFilter(props.filterChanged);
            }}
            getRowStyle={param => ({ "text-align": "center" })}
            onGridSizeChanged={onGridSizeChanged}
            onFirstDataRendered={params => params.api.sizeColumnsToFit()}
          />
        </div>
      </div>
    </>
  );
};

export default GeneralAccountLedgerGrid;
