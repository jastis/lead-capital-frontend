import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const beginTrip = async (requestId, payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post(AUTH_ROUTES.START_TRIPS(requestId), payload);
    successNotifier("Trip Started Successfully");
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
export const getAssignedRequest = async (skip, partnerId) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.ASSIGN_REQUEST(skip, partnerId));
    return data;
  } catch (e) {
    return [];

    // if (e.response) {
    //   errorNotifier(
    //     console.log(
    //       // e.response
    //       e.response?.data?.message || e.response?.data?.data?.message
    //     )
    //   );
    // } else {
    //   errorNotifier("Network Error, please check your internet connections");
    // }
  }
};
export const assignPersonal = async (requestId, payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.put(
      AUTH_ROUTES.ASSIGN_PERSONEL(requestId),
      payload
    );
    successNotifier("Request successfully");
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
