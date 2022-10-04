import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  //계정과목 트리
  root: {
    borderRadius: "12px", //모서리
    color: "black", //글자색상
    position: "static",
    //left: "-200px", //왼쪽위치
    top: "-20px",
    height: "100vh", //세로
    //width: "300px", //가로
    backgroundColor: "white", //배경색상
  },
  //계정과목 그리드
  root1: {
    borderRadius: "12px",
    position: "static",
    //left: "-300px", //왼쪽위치
    top: "-20px",
    height: "700px",
    width: "450px",
    backgroundColor: "white",
  },
  tab: {
    position: "relative",
    left: "20px",
    top: "20px",
    borderRadius: "12px", //모서리
    color: "white",
    backgroundColor: "#0042ED",
  },
  tab1: {
    position: "relative",
    left: "100px",
    top: "20px",
    borderRadius: "12px",
    color: "white",
    backgroundColor: "#0042ED",
  },
  tab2: {
    position: "relative",
    left: "150px",
    top: "35px",
    borderRadius: "12px",
    width: "30px", //가로
    color: "brown",
    backgroundColor: "#3DB7CC",
  },
}));

export default useStyles;
