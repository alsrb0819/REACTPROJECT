import axios from 'api/hrApi';

export const baseSalarySearch =
() => axios.get(  "/salary/baseSalaryManage");

export const baseSalaryUpdate =
(action) => axios.post("/salary/baseSalaryManage", 
{ sendData: action.payload }, 
{  headers: {  "Content-Type": "application/json" }},
);
//=====급여조회 => 월별급여조회=====
export const searchMonthSalary =
(action) =>
axios.get(
  "/salary/findCloseSalary",
  {
    params: {
      applyYearMonth:action.payload.applyYearMonth,
      deptCode:action.payload.deptCode
    },
  },
);
//============월급여 마감==============
export const salaryListSaga =
(action) =>
axios({
  method: "get",
  url: "/salary/findCloseSalary",
  params: {
    deptCode: action.payload.dept,
    applyYearMonth: action.payload.date,
  },
});

export const closeSalary =
(action) => 
axios({
  headers: { "Content-Type": "application/json" },
  method: "post",
  url: "/salary/modifyMonthSalary",
  data: {
    empcode1: action.payload.empcode1,
  },
})