import { createAction } from 'redux-actions';
import * as types from 'erp/logistic/sales/action/SalesActionType';

/***************************** 납품 관리 *********************************/
export const deliveryCompleteRequest = createAction(types.DELIVERY_COMPLETE_REQUEST);
//export const deliveryCompleteSuccess = createAction(types.DELIVERY_COMPLETE_SUCCESS);
//export const deliveryCompleteFailure = createAction(types.DELIVERY_COMPLETE_FAILURE);
export const deliveryDivisionStart = createAction(types.DELIVERY_DIVISON_START);
export const deliveryDivisionFailure = createAction(types.DELIVERY_DIVISON_FAILURE);



/***************************** 발주 관리 *********************************/
export const orderCompleteRequest = createAction(types.ORDER_COMPLETE_REQUEST);
export const orderDivisionStart = createAction(types.ORDER_DIVISON_START);
export const orderDivisionFailure = createAction(types.ORDER_DIVISON_FAILURE);