import accountApi from "api/accountApi";
import Axios from "axios";


//***********************2021-03-16 송화준 ******************************
export const selectCost = (action) =>
accountApi.get("/statement/costStatement", {
    params: {
        toDate: action.params.date,
    },
});

export const searchIncomeList = (action) =>
accountApi.get("/statement/incomeStatement", {
    params: {
        toDate: action.params.date,
        },
});
///////////////월별손익계산서
export const searchMonthIncomeList = (action) =>
accountApi.get("/statement/monthincomeStatement", {
    params: {
        toDate: action.params.date,
        },
    });

export const searchTotalTrial = (action) =>
accountApi.get("/statement/getTotalTrialBalance", {
    params: {
        toDate: action.params.date,
        },
    });

export const searchFinancial = (action) =>
accountApi.get("/statement/getFinancialPosition", {
        params: {
            toDate: action.params.date,
            },
    });

export const searchCustomerList = (action) =>
accountApi.get("/basicInfo/searchCustomer", {
    params: {
        searchCondition: action.params.searchCondition,
        workplaceCode: action.params.workplaceCode,
        },
});

export const searchJournalFormList = (action) =>
accountApi.get("/account/journal", {
    params: {
        startDate: action.params.startDate,
        endDate: action.params.endDate,
        },
});

export const searchCashJournalList = (action) =>
Axios.post(
    `http://localhost:4000/erp/acc/cashJournal`,
    {
    fromDate: action.params.fromDate,
    toDate: action.params.toDate,
    },
);

export const searchDetailTrial = (action) =>
accountApi.get("/statement/detailTrialBalance", {
    params: {
        fromDate: action.params.fromDate,
        toDate: action.params.toDate,
        },
});

export const selectAccount = (action) =>
accountApi.get(
    "http://localhost:8282/acc/account/getAccount",
    {
        params: {
            accountName: action.params.accountName,
            accountCode: action.params.accountCode,
        },
    });

export const searchAccountInfo = (action) =>
accountApi.get(
    "/account/getLedgerbyAccountInfo",{
    params: {
        startDate: action.params.startDate,
        endDate: action.params.endDate,
        accountCode: action.params.accountCode,
      },
    });

export const searchPreviousState = (action) =>
accountApi.get(
    "/statement/getFinancialPosition",{
        params: {
            toDate: action.params.date,
            },
        });
        
export const selectCashFlow = (action) =>
accountApi.get(
    "/statement/cashFlowStatement", {
        params: {
            toDate: action.params.date,
        },
    });
    