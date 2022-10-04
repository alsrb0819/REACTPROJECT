import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from './loading';

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        console.log('createRequestSaga: action');
        console.log(action);
        console.log(request);
        console.log('로딩 시작');
        yield put(startLoading(type)); //로딩 시작
        try {
            const response = yield call(request, action);
            console.log('response');
            console.log(response);

            console.log('SUCCESS');
            console.log(SUCCESS);
            if (response)
                yield put({
                    type: SUCCESS,
                    payload: response.data
                });
            console.log('완료');
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true
            });
            console.log('실패');
            console.log(e);
        }
        yield put(finishLoading(type));
    };
}
