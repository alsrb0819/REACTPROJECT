import React from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import * as Api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';

function ContractTypeSearchDialog(props) {

    const column = {
        columnDefs: [
            { headerName: '유형 코드', field: 'detailCode', width: 100 },
            { headerName: '유형', field: 'detailCodeName', width: 100 },
            { headerName: "사용여부", field: "codeUseCheck", width:50},
        ]
    };
    const onCellClicked = params => {
        props.onCellClicked(params);
        props.close();
    };

const [list, searchListFetch] = useAsync(() => Api.searchContractType(),[],false);

    return (
        <MyGrid
            style={{ height: '10vh' }}
            column={column}
            title={'수주 유형'}
            list={list.data&&list.data.detailCodeList}
            onCellClicked={onCellClicked}
            rowSelection="single"
        />
    );
}

export default ContractTypeSearchDialog;
