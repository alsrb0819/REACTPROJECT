import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useSelector } from "react-redux";
import { useThemeSwitcher } from "mui-theme-switcher";

const TotalTrialBalanceGrid = () => {
  const { data } = useSelector(state => state.AccReducer.StatementReducer);
  //const { error } = useSelector(state => state.AccReducer);
  //const { isLoading } = useSelector(state => state.AccReducer);
  console.log("data", data);
  //[0].accountInnerCode
  const currencyFormatter = params => {
    return formatNumber(params.value) + " 원";
  };

  const formatNumber = number => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const TTBcolumnDefs = [
    {
      headerName: "차변 잔액",
      field: "debitsSumBalance",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "차변 합계",
      field: "debitsSum",
      valueFormatter: currencyFormatter,
    },
    { headerName: " 계정 과목 ", field: "accountName" },
    {
      headerName: "대변 합계",
      field: "creditsSum",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "대변 잔액",
      field: "creditsSumBalance",
      valueFormatter: currencyFormatter,
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
        rowStyle={{ "text-align": "center" }}
        style={{
          //height: "60vh",
          width: "100%",
          //paddingTop: "20px",
          float: "center",
        }}
      >
        <AgGridReact
          columnDefs={TTBcolumnDefs}
          rowData={data}
          rowSelection="single"
          getRowStyle={function(param) {
            return { "text-align": "center" };
          }} //body 가운데 정렬
          onGridReady={e => {
            e.api.sizeColumnsToFit();
          }}
          domLayout={"autoHeight"}
          // onCellClicked={onCellClicked}
          onGridSizeChanged={onGridSizeChanged}
        />
      </div>
    </div>
  );
};

export default TotalTrialBalanceGrid;
