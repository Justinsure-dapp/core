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
import FaucetPage from "./FaucetPage";
import SwapPage from "./SwapPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage />} />
        <Route path="policies" element={<PoliciesPage />} />
        <Route path="policies/:address" element={<PolicyPage />} />

        <Route path="account" element={<AccountPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="buy-policy/:address" element={<BuyPolicyPage />} />
        <Route path="/swap" element={<SwapPage />} />

        <Route element={<ProtectedRoute type={ProtectedTypes.CONSUMERONLY} />}>
          <Route path="new-marketer" element={<NewMarketerPage />} />
        </Route>

        <Route element={<ProtectedRoute type={ProtectedTypes.MARKETERONLY} />}>
          <Route path="new-policy" element={<NewPolicyPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
        <Route path="/faucet" element={<FaucetPage />} />
      </Route>
    </>,
  ),
);

export default router;
