import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { counterReducer } from '../components/counter/reducer';
import { connectRouter, routerMiddleware } from 'connected-react-router'; 
import { createBrowserHistory } from 'history';
import { authReducer } from '../components/auth/login/reducer';


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {

    const reducers = {
        counter: counterReducer,
        auth: authReducer
    };

    const rootReducer = combineReducers({
        ...reducers, //спред оператор
        router: connectRouter(history)
    });

    const middleware = [
        routerMiddleware(history),
        thunk
    ];
    
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
      window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
      enhancers.push(window.devToolsExtension());
    }

    return createStore(rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers));
}

