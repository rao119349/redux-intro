import { combineReducers, createStore } from "redux";
import {accountReducer, deposit, withdraw, requestLoan, payLoan } from "./features/accounts/accountSlice";
import {customerReducer, updateName } from "./features/customers/customerSlice";

// Creating the Redux store with combined reducers (using a simple approach here)
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

export default store;