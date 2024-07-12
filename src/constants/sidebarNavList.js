import { AiTwotoneSetting } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import {
  BsDatabaseFillGear,
  BsFileEarmarkCheckFill,
  BsFillCreditCardFill,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import { FaShuttleVan } from "react-icons/fa";
import { PROTECTED_ROUTES } from "./navRoutes";

export const NAVS = [
  {
    title: "Dashboard",
    to: PROTECTED_ROUTES.dashboard,
    icon: BiSolidDashboard,
  },
  {
    title: "Requests",
    to: PROTECTED_ROUTES.requests,
    icon: BsFillFileEarmarkTextFill,
  },
  {
    title: "Assigned Requests",
    to: PROTECTED_ROUTES.accepted_requests,
    icon: BsFileEarmarkCheckFill,
  },
  { title: "Trips", to: PROTECTED_ROUTES.trips, icon: FaShuttleVan },
  {
    title: "Transactions",
    to: PROTECTED_ROUTES.transactions,
    icon: BsFillCreditCardFill,
    subPages: [
      {
        title: "Transaction History",
        to: PROTECTED_ROUTES.transaction_history,
      },
    ],
  },
  {
    title: "Transport Control",
    to: PROTECTED_ROUTES.transport_control,
    icon: BsDatabaseFillGear,
    subPages: [
      { title: "Driver", to: PROTECTED_ROUTES.transport_control_driver },
      { title: "Trucks", to: PROTECTED_ROUTES.transport_control_trucks },
      {
        title: "Issue Report",
        to: PROTECTED_ROUTES.transport_control_issue_report,
      },
    ],
  },
  {
    title: "Settings",
    to: PROTECTED_ROUTES.settings,
    icon: AiTwotoneSetting,
    subPages: [
      // { title: "Quality", to: PROTECTED_ROUTES.quality },
      { title: "Support", to: PROTECTED_ROUTES.support },
    ],
  },
];
