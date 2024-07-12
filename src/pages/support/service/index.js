import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const createSupport = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.SUPPORT, payload);
    successNotifier("Support Ticket successfully created");
  } catch (e) {
    if (e.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
export const createSupportResponse = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.SUPPORT_RESPONSE, payload);
    successNotifier("Ticket responded successfully");
  } catch (e) {
    if (e.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};