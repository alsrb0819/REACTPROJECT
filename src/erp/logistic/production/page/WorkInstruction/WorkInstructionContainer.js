import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import WorkInstruction from "./WorkInstruction";
import WorkOrderStatus from "./WorkOrderStatus";
import WorkPerformanceManagement from "./WorkPerformanceManagement";

function WorkInstructionContainer(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="작업지시" />
          <Tab label="작업지시현황" />
          <Tab label="생산실적관리" />
        </Tabs>
      </AppBar>
      {value === 0 && <WorkInstruction />}
      {value === 1 && <WorkOrderStatus />}
      {value === 2 && <WorkPerformanceManagement />}
    </>
  );
}

export default WorkInstructionContainer;
