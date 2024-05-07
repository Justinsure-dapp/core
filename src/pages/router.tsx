import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../layout";

import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import PoliciesPage from "./PoliciesPage";
import NewPolicyPage from "./NewPolicyPage";
import PolicyPage from "./PolicyPage";
import AccountPage from "./AccountPage";
import SettingsPage from "./SettingsPage";
import NewMarketerPage from "./NewMarketerPage";
import BuyPolicyPage from "./BuyPolicyPage";
import DashboardPage from "./DashboardPage";
import ProtectedRoute, { ProtectedTypes } from "../common/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage />} />
        <Route path="policies" element={<PoliciesPage />} />
        <Route path="policies/:id" element={<PolicyPage />} />

        <Route element={<ProtectedRoute type={ProtectedTypes.VERIFIEDONLY} />}>
          <Route path="account" element={<AccountPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="buy-policy/:id" element={<BuyPolicyPage />} />
        </Route>

        <Route element={<ProtectedRoute type={ProtectedTypes.CONSUMERONLY} />}>
          <Route path="new-marketer" element={<NewMarketerPage />} />
        </Route>

        <Route element={<ProtectedRoute type={ProtectedTypes.MARKETERONLY} />}>
          <Route path="new-policy" element={<NewPolicyPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </>
  )
);

export default router;
