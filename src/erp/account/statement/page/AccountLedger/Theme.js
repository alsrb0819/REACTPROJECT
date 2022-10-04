import { makeStyles, Theme } from "@material-ui/core/styles";

//========================================= 2020-08-25 계정별원장 조편백 ==============================================

const useStyles = makeStyles(theme => ({
  // 간격띄우기
  margin: {
    "& > *": { margin: theme.spacing(2) },
  },
  //계정코드조회
  root: {
    borderRadius: "12px", //모서리
    color: "black", //글자색상
    position: "static",
    //left: "-220px", //왼쪽위치
    height: "700px", //세로
    width: "400px", //가로
    backgroundColor: "white", //배경색상
  },
  //계정코드기간조회
  root1: {
    borderRadius: "12px",
    position: "static",
    //left: "260px", //왼쪽위치
    height: "700px",
    width: "1100px",
    backgroundColor: "white",
  },
  //날짜간격띄우기
  root2: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  tab: {
    position: "relative",
    //left: "65px",
    borderRadius: "12px", //모서리
    color: "white",
    backgroundColor: "#0042ED",
  },
  tab1: {
    position: "relative",
    //left: "420px",
    borderRadius: "12px",
    color: "white",
    backgroundColor: "#0042ED",
  },
  input: {
    textAlign: "center",
    width: "330px",
    height: "30px",
  },
  buttonsize: {
    position: "relative",
    top: "30px",
    //left: "145px",
    width: "120px",
    padding: "10px",
    margin: "5px",
  },
  Clock: {
    position: "relative",
    height: "100px",
  },
  textField: {
    color: "secondary",
    marginLeft: 1,
    marginRight: 1,
    width: "330px",
    fontSize: 60,
  },
}));

export default useStyles;
