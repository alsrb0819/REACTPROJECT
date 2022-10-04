import * as types from 'erp/logistic/sales/action/SalesActionType';

export const deliverySuccess = successData => ({
    type: types.DELIVERY_COMPLETE_SUCCESS,
    successData
});

export const orderSuccess = successData => ({
    type: types.ORDER_COMPLETE_SUCCESS,
    successData
});

const initialState = {
    deliveryCompleteData: [],
    orderCompleteData: [],
    isDeliveryOpen: false
};

const Sales = (state = initialState, action) => {
    switch (action.type) {
        case types.DELIVERY_COMPLETE_SUCCESS:
            console.log('action.payload', action.payload);
            return {
                ...state,
                deliveryCompleteData: action.payload
            };
        case types.DELIVERY_COMPLETE_FAILURE:
            return {
                ...state,
                deliveryCompleteData: action.error
            };
        case types.DELIVERY_DIVISON_FAILURE:
            return {
                ...state,
                deliveryCompleteData: action.error
            };
            
        case types.ORDER_COMPLETE_SUCCESS:
            console.log('action.payload', action.payload);
            return {
                ...state,
                orderCompleteData: action.payload
            };
        case types.ORDER_COMPLETE_FAILURE:
            return {
                ...state,
                orderCompleteData: action.error
            };
        case types.ORDER_DIVISON_FAILURE:
            return {
                ...state,
                orderCompleteData: action.error
            };  

        default:
            return state;
    }
};

export default Sales;
