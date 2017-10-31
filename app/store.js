import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';


// import the root saga
import rootSaga from './sagas/root';

// import the root reducer
import rootReducer from './reducers';
import {socketURL, socketPrefix} from '../config/conf';

export default function createStoreWithMiddleware(history, data) {
    const socket = io(socketURL);
    console.log(socketURL);
    const reduxRouterMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const socketIoMiddleware = createSocketIoMiddleware(socket, socketPrefix);
    const middleware = [reduxRouterMiddleware,
        sagaMiddleware,
        socketIoMiddleware];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        || compose;
    const store = createStore(rootReducer, data, composeEnhancers(
        applyMiddleware(...middleware)
    ));

    sagaMiddleware.run(rootSaga);

    return store;
}
