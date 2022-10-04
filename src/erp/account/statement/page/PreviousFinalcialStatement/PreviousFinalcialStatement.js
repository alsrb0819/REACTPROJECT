//************************* 2020-11-26 전기분재무상태표 시작 최지은&노원찬 *************************
import React from "react";
import { Typography, AppBar, Toolbar, Grid } from "@material-ui/core";
import PreviousFinalcialStatementGrid from "./PreviousFinalcialStatementGrid";
import PreviousFinalcialStatementMenu from "./PreviousFinalcialStatementMenu";

const PreviousFinalcialStatement = () => {

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className="ui primary segment">
            <AppBar position="sticky">
              <Toolbar>
                <Typography component="h2" variant="h3">
                  전기분재무상태표
                </Typography>
              </Toolbar>
            </AppBar>
            <PreviousFinalcialStatementMenu />
            <PreviousFinalcialStatementGrid />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PreviousFinalcialStatement;
