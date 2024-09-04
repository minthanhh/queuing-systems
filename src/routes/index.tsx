import Dashboard from '@/pages/Root/Dashboard'
import { Auth, Protected, Root } from '../layouts'

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Device from '@/pages/Root/Devices/Device'
import AddDevice from '@/pages/Root/Devices/AddDevice'
import DetailDevice from '@/pages/Root/Devices/DetailDevice'
import UpdateDevice from '@/pages/Root/Devices/UpdateDevice'
import DetailGiveNumber from '@/pages/Root/Devices/DetailGiveNumber'
import Service from '@/pages/Root/Services/Service'
import AddService from '@/pages/Root/Services/AddService'
import DetailService from '@/pages/Root/Services/DetailService'
import UpdateService from '@/pages/Root/Services/UpdateService'
import Report from '@/pages/Root/Report/Report'
import ForgotPassword from '@/pages/Auth/ForgotPassword'
import ResetPassword from '@/pages/Auth/ResetPassword'
import Profile from '@/pages/Root/Profile'
import NewNumber from '@/pages/Root/Number/NewNumber'
import UserLogs from '@/pages/Root/UserLogs'
import GiveNumber from '@/pages/Root/Number/GiveNumber'
import UpdateAccount from '@/pages/Root/Managers/Accounts/UpdateAccount'
import AddAccount from '@/pages/Root/Managers/Accounts/AddAccount'
import Account from '@/pages/Root/Managers/Accounts/Account'
import UpdateRole from '@/pages/Root/Managers/Roles/UpdateRole'
import AddRole from '@/pages/Root/Managers/Roles/AddRole'
import Role from '@/pages/Root/Managers/Roles/Role'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Protected />}>
            <Route path="/" element={<Root />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/devices" element={<Device />} />
                <Route path="/devices/add-device" element={<AddDevice />} />
                <Route path="/devices/detail-device/:id" element={<DetailDevice />} />
                <Route path="/devices/update-device/:deviceId" element={<UpdateDevice />} />
                <Route path="/devices/detail-give-number/:giveNumberId" element={<DetailGiveNumber />} />
                <Route path="/services" element={<Service />} />
                <Route path="/services/add-service" element={<AddService />} />
                <Route path="/services/detail-service/:serviceId" element={<DetailService />} />
                <Route path="/services/update-service/:serviceId" element={<UpdateService />} />
                <Route path="/reports" element={<Report />} />

                {/* Roles */}
                <Route path="/setting-systems/manager-roles" element={<Role />} />
                <Route path="/setting-systems/manager-roles/add-role" element={<AddRole />} />
                <Route path="/setting-systems/manager-roles/update-role/:roleId" element={<UpdateRole />} />

                {/* Accounts */}
                <Route path="/setting-systems/manager-accounts" element={<Account />} />
                <Route path="/setting-systems/manager-accounts/add-account" element={<AddAccount />} />
                <Route path="/setting-systems/manager-accounts/update-account/:accountId" element={<UpdateAccount />} />

                {/* User Logs */}
                <Route path="/setting-systems/user-logs" element={<UserLogs />} />
                <Route path="/give-number" element={<GiveNumber />} />
                <Route path="/give-number/give-list-numbers/new-number" element={<NewNumber />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Give number */}
            <Route path="/login" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Route>,
    ),
)

export default router
