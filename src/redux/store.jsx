import { configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import usersReducer from './UsersSlice';
import adminsReducer from './adminsSlice';
import adminReducer from './LoggedInAdminSlice'
import transactionsReducer from './fetchUserTransactionsSlice'
import AdminActivitiesReducer from './AdminActivitySlice'
import suspendedUsersReducer from './suspendedAccounts'
import flaggedUsersReducer from './flaggedAccounts'
import unsuspendedUsersReducer from "./unsuspendedAccounts";


// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'users',
    'admins',
    'admin',
    'transactions',
    'AdminActivities',
    'suspendedUsers',
    'unsuspendedUsers',
    'flaggedUsers'
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
  flaggedUsers: flaggedUsersReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
 
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

// Create a persistor to persist the store
export const persistor = persistStore(store);
export default store;
