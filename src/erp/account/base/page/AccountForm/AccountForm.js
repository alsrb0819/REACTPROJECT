import React, { useState } from "react";
import AccountTreeView from "./AccountTreeView";
import AccountGrid from "./AccountGrid";
import {
  AppBar,
  Typography,
  Container,
  Toolbar,
  Grid,
  Paper,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "blue",
  },
});

const AccountForm = () => {
  const classes = useStyles();
  const [accountInfo, setAccountInfo] = useState("");
  const [accountName, setAccountName] = useState("");
  return (
    <div className="ui primary segment">
      <Typography variant="h3" gutterBottom>
        계정과목관리
      </Typography>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={4} alignItems="stretch">
          <Container maxWidth="sm">
            <Paper elevation={3} className={classes.paper}>
              <AppBar color="primary" position="static">
                <Toolbar>
                  <Typography variant="h4">계정</Typography>
                </Toolbar>
              </AppBar>
              <AccountTreeView
                setAccountInfo={setAccountInfo}
                setAccountName={setAccountName}
              />
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={8}>
          <Container>
            <Paper elevation={3} className={classes.paper}>
              <AccountGrid accountInfo={accountInfo} />
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};
export default AccountForm;
