import { Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateContext } from "../GlobalStateContext/GlobalState";
import RequestDetails from "../pages/requests/components/RequestDetails";
import IssueReport from "../pages/transport-control/sub-pages/issue-report";
import Dashboard from "../pages/dashboard";
import Requests from "../pages/requests";
import Settings from "../pages/settings";
import Transactions from "../pages/transactions";
import TransportControl from "../pages/transport-control";
import AcceptedRequests from "../pages/accepted-requests";
import Trucks from "../pages/transport-control/sub-pages/trucks";
import Trips from "../pages/trips";
import TripDetails from "../pages/trips/components/TripDetails";
import Navigation from "./Navigation";
import Notification from "../pages/notification/index";
// import Navigations from "../pages/settings/components/tabs/Notifications"
import Navigations from "../pages/settings/components/tabs/Notifications";
import Sidebar from "./Sidebar";
import { PROTECTED_ROUTES } from "../constants/navRoutes";
import TransactionHistory from "../pages/transactions/components/TransactionHistory";
import { useGetState } from "../GlobalStateContext/useGetState";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../service/api";

function AuthenticatedRoutes() {
  const { setState = {} } = useGetState();

  const {} = useQuery({
    queryKey: ["get-partner-info"],
    queryFn: () =>
      axiosInstance.get(`/partner/account`).then((res) => {
        const userInfo = res?.data?.data?.[0];
        setState(userInfo);
        return res;
      }),
  });

  return (
    // <GlobalStateContext.Provider value={{ state, setState }}>
    <BrowserRouter>
      <Flex flexDir={"row"} bg="#F6F6F6">
        <Sidebar w="20%" />
        <Stack w={["100%", "100%", "80%"]}>
          <Navigation />
          <Flex flexDir={"column"} p={["20px 10px", "20px 30px"]}>
            <Routes>
              <Route
                path={PROTECTED_ROUTES.dashboard}
                element={<Dashboard />}
              />
              <Route
                path={PROTECTED_ROUTES.notification}
                element={<Notification />}
              />

              <Route path={PROTECTED_ROUTES.trips} element={<Trips />} />
              <Route path="/trips/:tripId" element={<TripDetails />} />

              <Route path={PROTECTED_ROUTES.settings} element={<Settings />} />
              <Route path="/nav/setting" element={<Navigations />} />
              <Route
                path={PROTECTED_ROUTES.support}
                element={<Settings openSupport />}
              />

              <Route
                path={PROTECTED_ROUTES.transactions}
                element={<Transactions />}
              />
              <Route
                path={PROTECTED_ROUTES.transaction_history}
                element={<TransactionHistory />}
              />
              <Route path={PROTECTED_ROUTES.requests} element={<Requests />} />
              <Route path="/requests/detail/*" element={<RequestDetails />} />

              <Route
                path={PROTECTED_ROUTES.accepted_requests}
                element={<AcceptedRequests />}
              />
              <Route
                path={PROTECTED_ROUTES.transport_control}
                element={<TransportControl />}
              />
              <Route
                path={PROTECTED_ROUTES.transport_control_driver}
                element={<TransportControl />}
              />

              <Route
                path={PROTECTED_ROUTES.transport_control_trucks}
                element={<Trucks />}
              />
              <Route
                path={PROTECTED_ROUTES.transport_control_issue_report}
                element={<IssueReport />}
              />

              <Route path="/*" element={<Dashboard />} />
            </Routes>
          </Flex>
        </Stack>
      </Flex>
    </BrowserRouter>
    // </GlobalStateContext.Provider>
  );
}

export default AuthenticatedRoutes;
