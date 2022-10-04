import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  AppBar,
  Typography,
  Toolbar,
  MenuItem,
  Paper,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import useStyles1 from "erp/account/account/page/Slip/Theme";
import OpenMonthAmortizationDialog from "./Dialog/OpenMonthAmortizationDialog";
import { SAVE_NON_CURRENT_START } from "../../reducer/AccountReducer";
/*##################################### 2020-11-20납품현황 박민호 #######################################*/
const NonCurrentAssetDetail = props => {
  const [acquistionCost, setAcquistionCost] = useState("");
  const [depreciation, setDepreciation] = useState("");
  const [bookValue, setBookValue] = useState("");
  const [amortizationWay, setAmortizationWay] = useState("");
  const [amortizationFinalYear, setAmortizationFinalYear] = useState("");
  const [usefulLife, setUsefulLife] = useState("");
  const [amortizationRate, setAmortizationRate] = useState("");
  const [month, setMonth] = useState("");
  const [normalAmortization, setNormalAmortization] = useState("");
  const [RAccumulatedAmortization, setRAccumulatedAmortization] = useState("");
  const [accumulatedAmortization, setAccumulatedAmortization] = useState("");
  const [bookValueEnd, setBookValueEnd] = useState("");
  const [open1, setOpen1] = useState("");
  const dispatch = useDispatch();
  const theme = useStyles1();
  var [openMonthAmoriztionDialog, setOpenMonthAmoriztionDialog] = useState(
    false,
  );

  const currencies = [
    {
      value: "정액법",
      label: "정액법",
    },
    {
      value: "정률법",
      label: "정률법",
    },
  ];

  const classes = useStyles();

  const onChange1 = e => {
    setAmortizationWay(e.target.value);
    if (e.target.value === "정률법") {
      setAmortizationRate(
        Math.ceil((1 - Math.pow(0.05, 1 / usefulLife)) * 1000) / 1000,
      );
      setNormalAmortization(bookValue * amortizationRate);
    } else if (e.target.value === "정액법") {
      setAmortizationRate(Math.ceil((1 / usefulLife) * 1000) / 1000);
      console.log(amortizationRate, "::::", acquistionCost);
      setNormalAmortization(acquistionCost * amortizationRate);
    }
  };

  const onSubmit = e => {
    //등록
    let gridRow = props.nonCurrentAsst[0];
    if (gridRow === undefined) {
      alert("그리드 선택바랍니다");
      return;
    }
    let NonCAassetCode = gridRow.assetCode;
    if (
      acquistionCost !== "" &&
      depreciation !== "" &&
      bookValue !== "" &&
      amortizationWay !== "" &&
      amortizationFinalYear !== "" &&
      usefulLife !== "" &&
      amortizationRate !== "" &&
      month !== "" &&
      normalAmortization !== ""
    ) {
      let newData = {
        acquistionCost: acquistionCost,
        depreciation: depreciation,
        bookValue: bookValue,
        amortizationWay: amortizationWay,
        amortizationFinalYear: amortizationFinalYear,
        usefulLife: usefulLife,
        amortizationRate: amortizationRate,
        month: month,
        normalAmortization: normalAmortization,
        RAccumulatedAmortization: RAccumulatedAmortization,
        accumulatedAmortization: accumulatedAmortization,
        bookValueEnd: bookValueEnd,
      };
      if (NonCAassetCode === "자동생성") {
        gridRow.currentAssetDetailBean = newData;
        gridRow.checkStatus = "insert"; //등록
        dispatch({
          type: SAVE_NON_CURRENT_START,
          params: gridRow,
        });
        alert("등록 되었습니다");
        return;
      } else if (NonCAassetCode !== "자동생성") {
        gridRow.currentAssetDetailBean = newData;
        gridRow.checkStatus = "update"; //수정
        dispatch({
          type: SAVE_NON_CURRENT_START,
          params: gridRow,
        });
        alert("수정 되었습니다");
      }
    } else {
      alert("빈칸기입 바랍니다");
    }
  };

  useEffect(() => {
    setBookValue(acquistionCost - depreciation);
    if (amortizationWay === "정률법") {
      //정률법계산

      setAmortizationRate(
        Math.ceil((1 - Math.pow(0.05, 1 / usefulLife)) * 1000) / 1000,
      );
      setNormalAmortization(Math.ceil(bookValue * amortizationRate));
      setAccumulatedAmortization(
        parseInt(depreciation) + parseInt(normalAmortization),
      );
      setBookValueEnd(bookValue - normalAmortization);
    } else if (amortizationWay === "정액법") {
      //정액법 계산

      setAmortizationRate(Math.ceil((1 / usefulLife) * 1000) / 1000);
      setNormalAmortization(Math.ceil(acquistionCost * amortizationRate));
      setAccumulatedAmortization(
        parseInt(depreciation) + parseInt(normalAmortization),
      );
      setBookValueEnd(bookValue - normalAmortization);
    }
    setMonth("12");
    setRAccumulatedAmortization("0");
    setOpen1(normalAmortization); //월상각내역 담음
  }, [
    usefulLife,
    acquistionCost,
    amortizationRate,
    amortizationWay,
    bookValue,
    accumulatedAmortization,
    depreciation,
    bookValueEnd,
    normalAmortization,
  ]);

  useEffect(() => {
    let gridRow = props.nonCurrentAsst[0];
    if (gridRow !== undefined) {
      console.log(gridRow.currentAssetDetailBean);
      if (gridRow.currentAssetDetailBean !== undefined) {
        // 조회 했을시 디테일 뿌려주기위함.
        if (gridRow.currentAssetDetailBean[0] !== undefined) {
          //등록시 undefind 방지
          setAcquistionCost(gridRow.currentAssetDetailBean[0].acquistionCost);
          setDepreciation(gridRow.currentAssetDetailBean[0].depreciation);
          setBookValue(gridRow.currentAssetDetailBean[0].bookValue);
          setAmortizationWay(gridRow.currentAssetDetailBean[0].amortizationWay);
          setAmortizationFinalYear(
            gridRow.currentAssetDetailBean[0].amortizationFinalYear,
          );
          setUsefulLife(gridRow.currentAssetDetailBean[0].usefulLife);
          setAmortizationRate(
            gridRow.currentAssetDetailBean[0].amortizationRate,
          );
          setMonth(gridRow.currentAssetDetailBean[0].month);
          setNormalAmortization(
            gridRow.currentAssetDetailBean[0].normalAmortization,
          );
          setRAccumulatedAmortization(
            gridRow.currentAssetDetailBean[0].RAccumulatedAmortization,
          );
          setAccumulatedAmortization(
            gridRow.currentAssetDetailBean[0].accumulatedAmortization,
          );
          setBookValueEnd(gridRow.currentAssetDetailBean[0].bookValueEnd);
        }
      } else if (gridRow.currentAssetDetailBean === undefined) {
        if (gridRow.progress === "" || gridRow.assetName === "") {
          //고정자산 상세 초기화
          setAcquistionCost("");
          setDepreciation("");
          setBookValue("");
          setAmortizationWay("");
          setAmortizationFinalYear("");
          setUsefulLife("");
          setAmortizationRate("");
          setMonth("");
          setNormalAmortization("");
          setRAccumulatedAmortization("");
          setAccumulatedAmortization("");
          setBookValueEnd("");
        }
      }
    }
  }, [props.nonCurrentAsst]);

  useEffect(() => {
    let gridRow = props.nonCurrentAsst[0];
    if (gridRow !== undefined) {
      if (gridRow.progress !== "" || gridRow.assetName === "") {
        //상각 완료 년도 기입

        setAmortizationFinalYear(
          parseInt(gridRow.progress.substring(0, 4)) + parseInt(usefulLife),
        );
      }
    }
  }, [usefulLife]);

  useEffect(() => {}, []);
  const openDialog = () => {
    setOpenMonthAmoriztionDialog(true);
  };

  const closeDialog = () => {
    setOpenMonthAmoriztionDialog(false);
  };

  return (
    <>
      <OpenMonthAmortizationDialog
        open={openMonthAmoriztionDialog}
        value={open1}
        close={closeDialog}
      />
      <div className={theme.root}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h4">고정자산 상세</Typography>
            <Typography variant="h6" className={theme.title}></Typography>
            <Button
              className={theme.menuButton}
              variant="contained"
              color="secondary"
              onClick={onSubmit}
            >
              등록
            </Button>
            <Button
              className={theme.menuButton}
              variant="contained"
              color="secondary"
              onClick={openDialog}
            >
              월상각내역
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Paper>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className={classes.TextField}
            id="acquistionCost"
            label="취득원가"
            value={acquistionCost}
            onChange={e => {
              setAcquistionCost(e.target.value);
            }}
            disabled={props.visibleState}
          />
          <TextField
            className={classes.TextField}
            id="depreciation"
            label="전기말상각누계액"
            value={depreciation}
            onChange={e => {
              setDepreciation(e.target.value);
            }}
            disabled={props.visibleState}
          />
          <TextField
            className={classes.TextField}
            disabled
            id="bookValue"
            label="전기말장부가액"
            variant="filled"
            value={bookValue}
            onChange={e => {
              setBookValue(acquistionCost - depreciation);
            }}
          />
        </form>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className={classes.TextField}
            id="amortizationWay"
            select
            label="상각방법"
            value={amortizationWay}
            onChange={onChange1}
            disabled={props.visibleState}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={classes.TextField}
            disabled
            id="amortizationFinalYear"
            label="상각완료년도"
            variant="filled"
            value={amortizationFinalYear}
            onChange={e => {
              setAmortizationFinalYear(e.target.value);
            }}
          />
        </form>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className={classes.TextField}
            id="UsefulLife"
            label="내용연수"
            value={usefulLife}
            onChange={e => {
              setUsefulLife(e.target.value);
            }}
            disabled={props.visibleState}
          />
          <TextField
            className={classes.TextField}
            disabled
            id="amortizationRate"
            label="상각률"
            variant="filled"
            value={amortizationRate}
            onChange={e => {
              setAmortizationRate(e.target.value);
            }}
          />
          <TextField
            className={classes.TextField}
            disabled
            id="month"
            label="월수"
            value={"12"}
            variant="filled"
            onChange={e => {
              setMonth("e.target.value");
            }}
          />
        </form>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className={classes.TextField}
            id="normalAmortization"
            disabled
            label="일반상각비"
            defaultValue={normalAmortization}
            value={normalAmortization}
            onChange={e => {
              setNormalAmortization(e.target.value);
            }}
          />
          <TextField
            className={classes.TextField}
            disabled
            id="RAccumulatedAmortization"
            label="전기말상각누계액감소"
            variant="filled"
            onChange={e => {
              setRAccumulatedAmortization(e.target.value);
            }}
          />
          <TextField
            className={classes.TextField}
            disabled
            id="accumulatedAmortization"
            label="당기말상각누계액"
            variant="filled"
            value={accumulatedAmortization}
            onChange={e => {
              setAccumulatedAmortization(e.target.value);
            }}
          />
          <TextField
            className={classes.TextField}
            disabled
            id="bookValueEnd"
            label="당기말장부가액"
            variant="filled"
            value={bookValueEnd}
            onChange={e => {
              setBookValueEnd(e.target.value);
            }}
          />
        </form>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "11vh",
    //margin: theme.spacing(1),
    //width: "25ch",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    flexGrow: 1,
  },
  TextField: {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

export default NonCurrentAssetDetail;
