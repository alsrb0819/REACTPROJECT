import React from "react";
import UseStyles from "./UseStyles";
import {Paper,TextField,Button,Grid,AppBar,InputLabel,Box,Typography,Toolbar,
  Select,FormControl,OutlinedInput} from "@material-ui/core"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useInput from "util/useInput";
import BreakInput from "./BreakInput";

import { useDispatch } from "react-redux";
import { REST_ATTD_REQUEST } from "erp/hr/attendance/reducer/RestReducer"
import Axios from "axios";

//*************************휴가 신청/조회 종료 _재영 _20.08.31 *************************
const BreakComp = props => {
    const columnDefs = BreakInput;
    const classes = UseStyles();

  const fromDate = useInput("2020-01-01");
  const toDate = useInput("2020-12-31");
  let selectedInput = document.getElementsByName("breakTypeCode")[0];

  
  const codeDivision = element => {
    if(typeof element == "undefined") return "";
    else {
      // console.log(element.value); 
      return element.value; 
    }
  }

  const getInnerText = (compVal) => {
    if(!compVal) return;
    let returnVal = "";
    switch(compVal){
      case "ASC001": returnVal = "경조사"; break;
      case "ASC004": returnVal = "예비군"; break;
      case "ASC005": returnVal = "연차"; break;
      case "ASC006": returnVal = "오전반차"; break;
      case "ASC007": returnVal = "오후반차"; break;
      default : alert("compVal 확인요망");
    }
    return returnVal;
  }
  
  const serchBreak= () => {
    Axios.get("http://localhost:8282/hr/attendance/findRestAttdList",{         
      params:{ 
        startDate: fromDate.value,
        endDate: toDate.value,
        empCode: sessionStorage.getItem("empCodeInfo_token"),
        code: codeDivision(selectedInput)
      }
    }).then(response => {
      breakData.setValue(response.data.restAttdList);
    })
    .catch(err => {
      console.log(err)
    });
  };
  
  //const { data, fetch } = useAxios(fetchbreakList_axiosOptions);   // 조회를 사가로 했으면 결제승인페이지가 쉬웠을듯
    
  // togle
  const [breakOpen, setBreakOpen] = React.useState(false);

  function breakHandleClose() {
    // console.log(data);
    setBreakOpen(false);
  }

  function breakHandleOpen() {
    setBreakOpen(true);
  }

  const breakStartDate = useInput();
  const breakEndDate = useInput();
  const breakTypeCode = useInput();
  const cause = useInput();
  const startTime = useInput();
  const endTime = useInput();
  const breakData = useInput();

  const dispatch = useDispatch();

  const BatchDailyAttdRest = () => {
    if(!codeDivision(selectedInput)) { 
      alert("휴가 구분란을 입력하세요"); return; 
    }

    const numberOfDays = (
      (new Date(breakEndDate.value).getTime() -
        new Date(breakStartDate.value).getTime()) /
      (1000 * 60 * 60 * 24)
    ).toString();

    const timeFormAlter = (primitiveTime) => {
      if(!primitiveTime) return;
      let changedTime = primitiveTime.replace(":","");
      if(changedTime.charAt(0) === 0) changedTime = changedTime.replace(/(^0+)/, "");

      return Number(changedTime);
    }
    
    const restAttdApplyData = {
      empCode: sessionStorage.getItem("empCodeInfo_token"),
      restTypeCode: breakTypeCode.value,
      restTypeName: getInnerText(codeDivision(selectedInput)),
      requestDate: new Date().toISOString().substring(0, 10),
      startDate: breakStartDate.value,
      endDate: breakEndDate.value,
      cause: cause.value,
      applovalStatus: "승인대기",   // RST_ATTD테이블 칼럼 오탈자
      rejectCause: "",
      cost: "",    // getInnerText(cost.value), RST_ATTD테이블에 COST칼럼은 있지만, 해당칼럼은 NUMBER형이다. 각 항목에 대한 비용이 정의된 테이블을 찾지못했음
      startTime: timeFormAlter(startTime.value),
      endTime: timeFormAlter(endTime.value),
      numberOfDays: ( numberOfDays === "NaN" ? 0 : numberOfDays )
    };
    dispatch({ type: REST_ATTD_REQUEST, data: restAttdApplyData });
    
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
        <AppBar position="relative" className={classes.subCategory}>
                <Toolbar>
                  <Typography variant="h5">휴가 신청/조회</Typography>
                </Toolbar>
              </AppBar>
          <Paper className={classes.topPaper}>        
            <FormControl variant="outlined" className={classes.topFormControl}>
              <InputLabel
                ref={inputLabel}
                htmlFor="outlined-breakTypeCode-simple"
              >
              ATTD TYPE
              </InputLabel>
              <Select
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="breakTypeCode"
                    id="outlined-breakTypeCode-simple"
                  />
                }
                open={breakOpen}
                onClose={breakHandleClose}
                onOpen={breakHandleOpen}
                onChange={breakTypeCode.onChange}
              >
                <option value="ASC001">경조사</option>
                <option value="ASC004">예비군</option>
                <option value="ASC005">연차</option>
                <option value="ASC006">오전반차</option>
                <option value="ASC007">오후반차</option>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      <Grid item xs={3} alignContent="center" justify="center"  alignItems="baseline" >
        <Paper className={classes.leftPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">휴가 신청</Typography>
            </Toolbar>
          </AppBar>
          <br/><br/><br/>
          <form>
            <TextField
              id="breakStartDate"
              label="휴가 시작일"
              type="date"
              variant="outlined"
              defaultValue={breakStartDate.value}
              onChange={breakStartDate.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br/><br/>
            <TextField
              id="breakEndDate"
              label="휴가 종료일"
              type="date"
              variant="outlined"
              defaultValue={breakEndDate.value}
              onChange={breakEndDate.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />       
            <br/><br/>
            <TextField
              id="cause"
              label="휴가 사유"
              variant="outlined"
              defaultValue={cause.value}
              onChange={cause.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <br/><br/>
          <Box textAlign="center">
            <Button
              variant="contained" 
              color="primary"
              onClick={BatchDailyAttdRest}
            >
              신청
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={7} >
        <Paper className={classes.rightPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">휴가 조회</Typography>
            </Toolbar>
          </AppBar>
          <br/>
          <div>
            <TextField
              id={"fromDate"}
              label={"검색날짜"}
              type={"date"}
              defaultValue={fromDate.value}
              onChange={fromDate.onChange}
              className={classes.textField}
              variant="outlined"
            />
            ~
            <TextField
              id={"toDate"}
              label={"검색날짜"}
              type={"date"}
              defaultValue={toDate.value}
              onChange={toDate.onChange}
              className={classes.textField}
              variant="outlined"
            />
            <Button
              variant="contained" 
              color="primary"
              onClick= {serchBreak}
              className={classes.button}
            >
              조회
            </Button>
          </div>
          <div
            className={"ag-theme-material"}
            skipHeaderOnAutoSize="true"
                enableColResize="true"
                enableSorting="true"
                enableFilter="true"
                enableRangeSelection="true"        
                rowStyle={{ "text-align": "center" }}
                cellStyle={{ textAlign: "center" }}
            style={{
              height: "350px",
              width: "100%"
            }}
          >
            <AgGridReact columnDefs={columnDefs} rowData={breakData.value} getRowStyle={function (param) { return { "text-align": "center" }; }}  />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BreakComp;

//*************************휴가 신청/조회 종료 _재영 _20.08.31 *************************