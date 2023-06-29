import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
   Dashboard,
   Device,
   ForgotPassword,
   Report,
   Service,
   NumberLevel,
   ManagerRole,
   ManagerAccount,
   AddDevice,
   UpdateDevice,
} from './pages';
import { Auth, Root } from './routes';
import UserLogs from './pages/root/UserLogs';
import DetailDevice from './pages/root/devices/DetailDevice';
// import Protected from './routes/Protected';

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/">
         {/* <Route element={<Protected />}> */}
         <Route path="/" element={<Root />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Device />} />
            <Route path="/devices/add-device" element={<AddDevice />} />
            <Route
               path="/devices/detail-device/:id"
               element={<DetailDevice />}
            />
            <Route
               path="/devices/update-device/:id"
               element={<UpdateDevice />}
            />
            <Route path="/services" element={<Service />} />
            <Route path="/number-levels" element={<NumberLevel />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/manager-roles" element={<ManagerRole />} />
            <Route path="/manager-accounts" element={<ManagerAccount />} />
            <Route path="/user-logs" element={<UserLogs />} />
         </Route>
         {/* </Route> */}
         <Route path="/auth" element={<Auth />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
   )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
);
