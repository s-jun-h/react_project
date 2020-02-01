import { combineReducers } from 'redux' ;
import loginState from './loginState' ;

export default combineReducers({
    loginState,
    //다른 리듀서를 만들게 되면 여기에 import
}) ;