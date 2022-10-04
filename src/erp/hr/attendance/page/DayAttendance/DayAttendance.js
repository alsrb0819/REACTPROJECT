import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import Button from "@material-ui/core/Button";
import axios from "axios";

const DayAttendance = ({ data }) => {
  const [gridApi, setGridApi] = useState([]);
  const [attd, setAttd] = useState({});
  const state = {
    columnDefs: [
      { headerName: "사원코드", field: "empCode", hide: true }, // 숨기기
      { headerName: "일련번호", field: "dayAttdCode", hide: true },
      {
        headerName: "적용일",
        field: "applyDay",
        checkboxSelection: false,
      }, //체크박스창
      { headerName: "근태구분코드", field: "attdTypeCode", hide: true },
      { headerName: "근태구분명", field: "attdTypeName" },
      { headerName: "출/퇴근", field: "time" },
    ],
    rowData: data,
  };
  return (
    <div className="DayAttendance">
      <div
        className="ag-theme-balham"
        style={{
          height: "250px",
          width: "500px",
        }}
      >
        <AgGridReact
          columnDefs={state.columnDefs}
          rowData={state.rowData}
          onGridReady={params => {
            setGridApi(params.api);
          }}
          onSelectionChanged={() => {
            setAttd(gridApi.getSelectedRows());
          }}
        ></AgGridReact>
      </div>


    </div>
  );
};
export default DayAttendance;
