import React from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import * as Api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';

function CustomerSearchDialog(props) {

    const column = {
        columnDefs: [
            { headerName: '코드', field: 'detailCode', width: 100 },
            { headerName: '코드명', field: 'detailCodeName', width: 100 },
            { headerName: '사용여부', field: 'codeUseCheck', width: 50 }
        ]
    };
    const onCellClicked = params => {
        //console.log(params.data);
        props.onCellClicked(params);
        props.close();
    };

    const [list, searchListFetch] = useAsync(() => Api.searchDialogCustomer(),[],false);

    return (
        <MyGrid
            style={{ height: '10vh' }}
            column={column}
            title={'거래처 검색'}
            list={list.data&&list.data.detailCodeList}
            onCellClicked={onCellClicked}
            rowSelection="single"
        />
    );
}

export default CustomerSearchDialog;
