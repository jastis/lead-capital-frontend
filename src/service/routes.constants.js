import { DATA_ROWS } from "../components/CustomTable";

export const AUTH_ROUTES = {
  LOGIN: "/partner/login",
  RESET_PASSWORD: "/reset-password",
  TRUCK: "/truck",
  CREATE_DRIVER: "/driver",
  DRIVER: (skip) =>
    `/driver?limit=${DATA_ROWS.LIMIT}${skip ? `&skip=${skip}` : ""}`,
  GET_PARTNER: "/partner/account",

  //PARTNER
  SIGNUP: "/partner",

  // RESET PASSWORD
  UPDATE_PASSWORD: (partnerId) => `/partner/${partnerId}/reset-password`,
  UPDATE_PROFILE: (partnerId) => `/partner/${partnerId}`,

  //DASHBOARD
  GET_CARDS: `/analytics/cards`,
  GET_INCOME_CHART: `/analytics/partner-monthly-payment`,
  GET_TRIPS_CHART: `/analytics/partner-trips`,

  // REQUESTS
  ACCEPTED_REQUEST: (skip = 0, partnerId) =>
    `/resquest-response/response?limit=${DATA_ROWS.LIMIT}${
      skip ? `&skip=${skip}` : ""
    }&partnerId=${partnerId}`,
  GET_ALL_REQUEST: (live, skip = 0) =>
    `/request?live=${live}&limit=${DATA_ROWS.LIMIT}${
      skip ? `&skip=${skip}` : ""
    }`,
  UPDATE_REQUEST: (requestId) => `/request/update/${requestId}`,

  //ASSIGNED REQUEST
  ASSIGN_REQUEST: (skip, partnerId) =>
    `/request?partnerAssignments.partner=${partnerId}`,
  ASSIGN_PERSONEL: (requesId) => `/request/add-personel/${requesId}`,

  //ISSUE REPORT
  GET_REPORT: (partnerId, skip) =>
    `/support?userId=${partnerId}&type=report&limit=${DATA_ROWS.LIMIT}${
      skip ? `&skip=${skip}` : ""
    }`,
  CREATE_REPORT: "/support",

  // TRIPS
  TRIPS: "/trips",
  GET_TRIPS: (partnerId, skip) =>
    `/trips?partnerId=${partnerId}&limit=${DATA_ROWS.LIMIT}${
      skip ? `&skip=${skip}` : ""
    }`,
  GET_SINGLE_TRIP: (partnerId, _id) =>
    `/trips?partnerId=${partnerId}&_id=${_id}`,
  START_TRIPS: (requestId) => `/trips/${requestId}`,
  END_TRIPS: (requestId) => `/trips/end-trip/${requestId}`,

  //TRUCKS
  GET_TRUCKS: (partnerId, skip) =>
    `/truck?partnerId=${partnerId}&limit=${DATA_ROWS.LIMIT}${
      skip ? `&skip=${skip}` : ""
    }`,

  //DASHBOARD
  DASHBOARD: "/analytics/cards",

  //SUPPORT
  SUPPORT: "/support",
  SUPPORT_RESPONSE: "support/response",

  //PROFILE
  // UPDATE_PROFILE: (partnerId) => `/partner/${partnerId}`,

  //CUSTOMER
  CUSTOMER: (partnerId) => `/customer?partnerId=${partnerId}`,
  DELETE_CUSTOMER: (customerId, partnerId) =>
    `/customer/${customerId}?partnerId=${partnerId}`,

  //NOTIFICATION
  NOTIFICATION: "/notification",

  //TRANSACTION
  TRANSACTION: (partnerId, skip) =>
    `/payment/records?partner=${partnerId}&sort=desc&limit=${DATA_ROWS.LIMIT}${
      skip ? `&skip=${skip}` : ""
    }`,
  REQUEST_PAYOUT: "/payout/",
};
