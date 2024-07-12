import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getPartnerTrips = async (partnerId, skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_TRIPS(partnerId, skip));
    return data;
  } catch (e) {
    return [];
    // if (e.response) {
    //   errorNotifier(
    //     console.log(
    //       e.response?.data?.message || e.response?.data?.data?.message
    //     )
    //   );
    // } else {
    //   errorNotifier("Network Error, please check your internet connections");
    // }
  }
};
export const getSingleTrip = async (partnerId, _id) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_SINGLE_TRIP(partnerId, _id));
    return data;
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
    return [];
    // if (e.response) {
    //   errorNotifier(
    //     console.log(
    //       e.response?.data?.message || e.response?.data?.data?.message
    //     )
    //   );
    // } else {
    //   errorNotifier("Network Error, please check your internet connections");
    // }
  }
};

export const endTrip = async (requestId, action) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.put(AUTH_ROUTES.END_TRIPS(requestId), action);
    successNotifier("Trip Ended Successfully");
    return data;
  } catch (e) {
    if (e.response) {
      errorNotifier(e.response?.data?.message);
      console.log(e.response?.data?.message);
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
