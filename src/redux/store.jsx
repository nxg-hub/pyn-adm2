import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from "./UsersSlice";
import adminsReducer from "./adminsSlice";
import adminReducer from "./LoggedInAdminSlice";
import transactionsReducer from "./fetchUserTransactionsSlice";
import AdminActivitiesReducer from "./AdminActivitySlice";
import suspendedUsersReducer from "./suspendedAccounts";
import flaggedUsersReducer from "./flaggedAccounts";
import unsuspendedUsersReducer from "./unsuspendedAccounts";
import supportTicketsReducer from "./supportTicketsSlice";
import loanReducer from "./loanSlice";
import loanApprovalSummaryReducer from "./LoanApprovalSummarySlice";
import walletsReducer from "./fetchWalletsSlice";
import virtualCardsReducer from './fetchVirtualCardsSlice';
import employeesReducer from './fetchCorporateCustomerEmployees'


// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    'users',
    'admins',
    'admin',
    'transactions',
    'AdminActivities',
    'suspendedUsers',
    'unsuspendedUsers',
    'flaggedUsers',
    'supportTickets',
    'wallets',
    'virtualCards',
    'employees',
    "loan"
  ], 
};

const rootReducer = combineReducers({
  users: usersReducer,
  admins: adminsReducer,
  admin: adminReducer,
  transactions: transactionsReducer,
  AdminActivities: AdminActivitiesReducer,
  suspendedUsers: suspendedUsersReducer,
  unsuspendedUsers: unsuspendedUsersReducer,
  flaggedUsers: flaggedUsersReducer,
  supportTickets: supportTicketsReducer,
  loan: loanReducer,
  loanApprovalSummary: loanApprovalSummaryReducer,
  wallets: walletsReducer,
  virtualCards: virtualCardsReducer,
  employees: employeesReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

// Create a persistor to persist the store
export const persistor = persistStore(store);
export default store;
