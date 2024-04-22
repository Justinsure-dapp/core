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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="policies" element={<PoliciesPage />} />
        <Route path="new-policy" element={<NewPolicyPage />} />
        <Route path="policies/:id" element={<PolicyPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="new-marketer" element={<NewMarketerPage />} />
        <Route path="buy-policy/:id" element={<BuyPolicyPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </>
  )
);

export default router;
