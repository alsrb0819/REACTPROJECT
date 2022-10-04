import { makeStyles } from "@material-ui/core/styles";

//========================================= 2020-08-25 계정별원장 조편백 ==============================================

const useStyles = makeStyles(theme => ({
  // 간격띄우기
  margin: {
    "& > *": { margin: theme.spacing(2) },
  },
  //콤보
  formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0),
    minWidth: 120,
  },
  box: {
    background: "black",
    color: "white",
    width: "100%",
    height: "30px",
    textAlign: "center",
    fontSize: 20,
  },
  paper: {
    padding: theme.spacing(1),
    height: 330,
    width: 1190,
  },
  subCategory: {
    background: "#232f3e",
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
