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
   Role,
   UpdateService,
   AddRole,
   UpdateRole,
   Account,
   AddAccount,
   UpdateAccount,
   UserLogs,
   NewNumber,
   GiveNumber,
   Profile,
   ResetPassword,
   DetailGiveNumber,
} from '../pages';
import { Auth, Protected, Root } from '../layouts';

import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
} from 'react-router-dom';

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route element={<Protected />}>
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
            <Route
               path="/devices/detail-give-number/:giveNumberId"
               element={<DetailGiveNumber />}
            />
            <Route path="/services" element={<Service />} />
            <Route path="/services/add-service" element={<AddService />} />
            <Route
               path="/services/detail-service/:serviceId"
               element={<DetailService />}
            />
            <Route
               path="/services/update-service/:serviceId"
               element={<UpdateService />}
            />
            <Route path="/reports" element={<Report />} />

            {/* Roles */}
            <Route path="/setting-systems/manager-roles" element={<Role />} />
            <Route
               path="/setting-systems/manager-roles/add-role"
               element={<AddRole />}
            />
            <Route
               path="/setting-systems/manager-roles/update-role/:roleId"
               element={<UpdateRole />}
            />

            {/* Accounts */}
            <Route
               path="/setting-systems/manager-accounts"
               element={<Account />}
            />
            <Route
               path="/setting-systems/manager-accounts/add-account"
               element={<AddAccount />}
            />
            <Route
               path="/setting-systems/manager-accounts/update-account/:accountId"
               element={<UpdateAccount />}
            />

            {/* User Logs */}
            <Route path="/setting-systems/user-logs" element={<UserLogs />} />
            <Route path="/give-number" element={<GiveNumber />} />
            <Route
               path="/give-number/give-list-numbers/new-number"
               element={<NewNumber />}
            />
            <Route path="/profile" element={<Profile />} />
         </Route>

         {/* Give number */}
         <Route path="/login" element={<Auth />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
   )
);

export default router;
