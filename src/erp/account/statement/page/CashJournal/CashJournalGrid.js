import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useThemeSwitcher } from "mui-theme-switcher";

const CashJournalGrid = () => {
  const data = useSelector(({ AccReducer }) => AccReducer.StatementReducer.cashJournalList);

  const accountColumnDefs = [
    { headerName: "해당월", field: "monthReportingDate", width: 100 },
    { headerName: "일자", field: "reportingDate" },
    { headerName: "적요", field: "expenseReport", width: 100 },
    { headerName: "거래처", field: "customerCode", width: 100 },
    { headerName: "거래처명", field: "customerName" },
    {
      headerName: "입금",
      field: "deposit",
      width: 172,
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "출금",
      field: "withdrawal",
      width: 172,
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "잔액",
      field: "balance",
      width: 172,
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
  ];

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
    <div id="grid-wrapperr" style={{ width: "100%", height: "100%" }}>
      <div
        className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
        style={{
          height: "60vh",
          width: "100%",
          //paddingTop: "20px",
        }}
      >
        <AgGridReact
          domLayout={"autoHeight"}
          columnDefs={accountColumnDefs}
          rowData={data} // setData된 state를 결국 여기 넣어서 그리드에 표현함.
          rowSelection="single"
          onGidReady={e => {
            e.api.sizeColumnsToFit();
          }}
          onGridSizeChanged={onGridSizeChanged}
          getRowStyle={param => ({ "text-align": "center" })}
        />
      </div>
    </div>
  );
};

export default CashJournalGrid;
