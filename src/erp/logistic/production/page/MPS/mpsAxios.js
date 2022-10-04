import axios from "axios";
import Swal from "sweetalert2";

export const searchContractDetailInMpsAvailable = (setContractList,calendarDate) => {
    axios.get("http://localhost:8282/logi/production/searchContractDetailInMpsAvailable",{
        params:{
            startDate:calendarDate.startDate,
            endDate :calendarDate.endDate,
            searchCondition:'contractDate',
        }
    }).then(({data}) => {
        if(data.errorCode < 0 ){
            Swal.fire({
                icon: data.errorCode < 0 ? "error":"success",
                title: data.errorMsg
              });
        }
        
        console.log(data.gridRowJson);
        console.log("data.gridRowJson");

          setContractList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
          });
    });
}
export const convertContractDetailToMps = (contract) => {
    axios.post("http://localhost:8282/logi/production/convertContractDetailToMps",
    contract
    ).then(({data}) => {
        Swal.fire({
            icon: data.errorCode < 0 ? "error":"success",
            title: data.errorMsg
          });
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
          });
    });
}


export const searchMpsInfo = (setMpsList,calendarDate) => {

    axios.get("http://localhost:8282/logi/production/searchMpsInfo",{
        params : {
            startDate:calendarDate.startDate,
            endDate :calendarDate.endDate,
            includeMrpApply:'includeMrpApply'
        }
    }
    ).then(({data}) => {
        setMpsList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
          });
    });
}