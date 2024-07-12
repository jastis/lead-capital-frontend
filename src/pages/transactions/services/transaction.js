import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getTransactions = async (partnerId, skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.TRANSACTION(partnerId, skip));
    return data;
  } catch (e) {
    errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
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

export const requestPayout = async (payload, onClose) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.REQUEST_PAYOUT, payload);
    successNotifier("successful");
    onClose && onClose();
  } catch (e) {
    onClose && onClose();
    if (e.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
