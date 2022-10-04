import React, { useState } from "react";
import AccountLedgerGrid from "./AccountLedgerGrid";
import AccountSearch from "./AccountSearch";
import {
  Paper,
  Typography,
  Grid,
  makeStyles,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import AccountLedgerMenu from "./AccountLedgerMenu";
//import useStyles from "erp/account/statement/page/AccountLedger/Theme";

//========================================= 2020-08-25 계정별원장 조편백 ==============================================
const AccountLedger = () => {
  const classes = useStyles();

  // 코드 초기 상태값 정의
  // AccountSearch 에서 변경된날짜를 AccountLedgerSearch 에 넘겨주기위해 초기값을 부모컴포넌트에 세팅
  const [code, setAccountCode] = useState({
    accountCode: "",
  });

  return (
    <>
      <Typography variant="h3" gutterBottom>
        계정별 원장
      </Typography>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        <Grid item xs={4} alignItems="stretch">
          <Paper elevation={3} className={classes.paper}>
            <AppBar color="primary" position="static">
              <Toolbar>
                <Typography variant="h4">계정찾기</Typography>
              </Toolbar>
            </AppBar>
            <AccountSearch setAccountCode={setAccountCode} />
          </Paper>
        </Grid>
        <Grid item xs={8} alignItems="stretch">
          <Paper elevation={3} className={classes.paper}>
            <AppBar color="primary" position="static">
              <Toolbar>
                <Typography variant="h4">계정별 원장 출력기간</Typography>
              </Toolbar>
            </AppBar>
            <AccountLedgerMenu code={code} />
            <AccountLedgerGrid />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "blue",
  },
});

export default AccountLedger;
