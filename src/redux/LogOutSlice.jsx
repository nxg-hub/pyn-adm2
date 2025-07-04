import { persistor } from "./store";
import { logOut } from "./UsersSlice";


// export const logOutAndPurge = () => (dispatch) => {
//     dispatch (logOut());
//     localStorage.removeItem('token');
//     localStorage.removeItem('email');
//     localStorage.removeItem('adminRole');

//     persistor.purge();

// };
export const logOutAndPurge = () => async (dispatch) => {
  persistor.pause();             
  dispatch(logOut());          
  localStorage.clear();         
  await persistor.flush();    
  await persistor.purge();      
};
