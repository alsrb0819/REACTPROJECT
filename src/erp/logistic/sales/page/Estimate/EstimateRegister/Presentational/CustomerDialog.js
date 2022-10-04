import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import * as api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';

const CustomerDialog = props => {
    const [list, setList] = useState([]);
    const column = {
        columnDefs: [
            { headerName: '상세코드번호', field: 'customerCode', width: 100 },
            { headerName: '상세코드이름', field: 'customerName', width: 100 }
        ]
    };

    const [customer, searchCustomerFetch] = useAsync(() =>api.searchCustomer(), [], false);
    const onCellClicked = params => {
        //console.log(params.data);
        props.onCellClicked(params);
        props.close();
    };
    /*
    useEffect(() => {
        Axios.get('http://localhost:8282/hr/basicInfo/searchCustomer', {
            params: {
                searchCondition: 'ALL',
                workplaceCode: ''
            }
        })
            .then(response => {
                setList(response.data.gridRowJson);
                console.log(response.data.gridRowJson);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);
*/
    return (
        <MyGrid
            style={{ height: '10vh' }}
            column={column}
            title={'거래처 검색'}
            list={customer.data ? customer.data.gridRowJson : null}
            onCellClicked={onCellClicked}
            rowSelection="single"
        />
    );
};

export default CustomerDialog;
