import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectDayWorkerSalary, insertDayWorkerSalary, insertMonthWorkerSalary } from '../../saga/DayWorkerSalarySaga'
import DayWorkerSalaryGrid from "./DayWorkerSalaryGrid";


const DayWorkerSalaryContainer = (props) => 
{
  const{ 
    selectDayWorkerSalary,
    insertDayWorkerSalary,
    insertMonthWorkerSalary,
    dayworkerSalaryData,
} = props;

const insertDayWorkerSalaryHandler = (empCode, empName, workTime) => {
    console.log("insertDayWorkerSalaryHandler"+empCode);
    console.log(empName);
    console.log(workTime);
    insertDayWorkerSalary({
        empCode: empCode,
        empName: empName,
        workTime: workTime,
    });
}
 const insertMonthWorkerSalaryHandler = (empCode, empName, joinDate) => {
        console.log("insertMonthWorkerSalaryHandler"+empCode);
        console.log(empName);
        console.log(joinDate);
        insertMonthWorkerSalary({
            empCode: empCode,
            empName: empName,
            joinDate: joinDate,
        });
    }
    return (
        <DayWorkerSalaryGrid
        selectDayWorkerSalary={selectDayWorkerSalary}
        insertDayWorkerSalaryHandler={insertDayWorkerSalaryHandler}
        insertMonthWorkerSalaryHandler={insertMonthWorkerSalaryHandler}
        dayworkerSalaryData={dayworkerSalaryData}
        />
    )
}


// store가 업데이트될때마다 자동으로 호출된다
const mapStateToProps = state => {
    return {
        dayworkerSalaryData: state.hr.dayworkerandsalary.dayworkersalary.dayworkerSalaryData
    };
};




export default connect(mapStateToProps, {
    selectDayWorkerSalary,
    insertDayWorkerSalary,
    insertMonthWorkerSalary,
})(DayWorkerSalaryContainer);
