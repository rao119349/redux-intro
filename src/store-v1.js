import { combineReducers, createStore } from "redux";

// Initial States for account module
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

// Initial States for customer module
const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

// Reducers for account module
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
      case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

// Reducers for customer module
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

// Creating the Redux store with combined reducers (using a simple approach here)
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// Dispatching actions for testing purposes

// store.dispatch({ type: 'account/deposit', payload: 500 });
// store.dispatch({ type: 'account/withdraw', payload: 200 });
// store.dispatch({ type: 'account/requestLoan', payload: { amount: 5000, purpose: 'Home Renovation' } });
// console.log(store.getState());

// store.dispatch({ type: 'account/payLoan' });
// console.log(store.getState());


// Action creators for account module
// LATER: Move these to separate files
function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}

function payLoan() {
  return { type: 'account/payLoan' };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(5000, 'Home Renovation'));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

// Action creators for customer module
// LATER: Move these to separate files
function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  }
}

store.dispatch(createCustomer('Saurav Yadav', '123456789'));
console.log(store.getState());