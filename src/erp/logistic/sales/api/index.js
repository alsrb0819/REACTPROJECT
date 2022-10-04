import axios from 'api/logiApi';
import hr from 'api/hrApi';

export const downloadReport = (param) => {
    return axios.get("/sales/logisticExel", {
        params: param
    });
}

export const searchEstimate =
    async param => {
        const result = await axios.get("/sales/searchEstimates", {
            params: param
        });
        return result.data;
    }


export const estimateCellClicked =
    async params => {
        const result = await axios.get("/searchEstimateDetail", {
            params: {
                estimateNo: params.data.estimateNo
            }
        });
        return result.data;
    }

export const searchItemCode =
    async param => {
        const result = await axios.get('/base/getStandardUnitPrice', {
            params: param
        });
        return result.data;
    }


export const saveEstimateRow =
    async param => {
        const result = await axios.post(
            '/sales/addNewEstimates', {
                estimateDate: param.estimateDate,
                newEstimateInfo: param
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return result.data;
    }

export const searchCustomer =
    async () => {
        const result = await hr.get('/company/searchCustomer', {
            params: {
                searchCondition: 'ALL',
                workplaceCode: ''
            }
        })
        return result.data;
    }

export const searchItem =
    async () => {
        const result = await axios.get('/base/codeList', {
            params: {
                divisionCode: 'IT-_I'
            }
        })
        return result.data;
    }

export const searchDetailList =
    async (params) => {
        const result = await axios.get('/sales/searchContractDetail', {
            params: {
                contractNo: params.data.contractNo
            }
        })
        return result.data;
    }

export const searchContractList =
    async (param) => {
        const result = await axios.get('/sales/searchContract', {
            params: param
        })
        return result.data;
    }

export const estimateSearch =
    async (param) => {
        const result = await axios.get('/sales/searchEstimateInContractAvailable', {
            params: param
        })
        return result.data;
    }

export const addContract =
    async (param) => {
        const result = await axios.post('/sales/addNewContract', {
            batchList: param.batchList,
            contractDate: param.contractDate,
            personCodeInCharge: param.personCodeInCharge
        })
        return result.data;
    }

export const searchContractType =
    async () => {
        const result = await axios.get('/base/codeList', {
            params: {
                divisionCode: 'CT'
            }
        })
        return result.data;
    }

export const searchDialogCustomer =
    async () => {
        const result = await axios.get('/base/codeList', {
            params: {
                divisionCode: 'CL-01'
            }
        })
        return result.data;
    }