import ReactDOM from 'react-dom/client';
import './index.css';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { Provider } from 'react-redux';
import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from 'react-router-dom';
import store from './redux/store';
import {
   Dashboard,
   Device,
   AddDevice,
   UpdateDevice,
   DetailDevice,
   Service,
   AddService,
   DetailService,
   ForgotPassword,
   Report,
   NumberLevel,
   Role,
   UpdateService,
   AddRole,
   UpdateRole,
   Account,
   AddAccount,
   UpdateAccount,
} from './pages';
import { Auth, Root } from './routes';
import UserLogs from './pages/root/UserLogs';
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
               path="/devices/update-device/:deviceId"
               element={<UpdateDevice />}
            />
            <Route path="/services" element={<Service />} />
            <Route path="/services/add-service" element={<AddService />} />
            <Route
               path="/services/detail-service/:id"
               element={<DetailService />}
            />
            <Route
               path="/services/update-service/:id"
               element={<UpdateService />}
            />
            <Route path="/number-levels" element={<NumberLevel />} />
            <Route path="/reports" element={<Report />} />

            {/* Roles */}
            <Route path="/manager-roles" element={<Role />} />
            <Route path="/manager-roles/add-role" element={<AddRole />} />
            <Route
               path="/manager-roles/update-role/:roleId"
               element={<UpdateRole />}
            />

            {/* Accounts */}
            <Route path="/manager-accounts" element={<Account />} />
            <Route
               path="/manager-accounts/add-account"
               element={<AddAccount />}
            />
            <Route
               path="/manager-accounts/update-account/:accountId"
               element={<UpdateAccount />}
            />

            {/* User Logs */}
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <RouterProvider router={router} />
      </LocalizationProvider>
   </Provider>
);
