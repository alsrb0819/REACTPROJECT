import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectDayWorker, insertDayWorker, delDayWorker } from '../../saga/DayWorkerSaga'
import DayWorkerGrid from "./DayWorkerGrid";


const DayWorkerContainer = (props) => 
{
  const{ 
    selectDayWorker,
    insertDayWorker,
    delDayWorker,
    dayworkerData,
   } = props;
    
   console.log("DayWorkerContainerprops ",props)
   
const handleDayWorker = (empCode, empName) => {
    console.log('container!!' + empCode);
    console.log('container!!' + empName);
    selectDayWorker({
        empCode: empCode,
        empName: empName,
    });
}


    return (
          <DayWorkerGrid
          handleDayWorker={handleDayWorker}
                insertDayWorker={insertDayWorker}
               delDayWorker={delDayWorker}
                dayworkerData={dayworkerData}
                />


        
    )
};


// store가 업데이트될때마다 자동으로 호출된다
const mapStateToProps = state => {
    console.log("DayWorkerContainer state",state)
    return {
        dayworkerData: state.hr.dayworkerandsalary.dayworker.dayworkerData 
    };
};




export default connect(mapStateToProps, {
    selectDayWorker,
    insertDayWorker,
    delDayWorker,
})(DayWorkerContainer);
