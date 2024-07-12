import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const updateAccount = async (partnerId, payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.put(
      AUTH_ROUTES.UPDATE_PROFILE(partnerId),
      payload
    );
    successNotifier("successfully");
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
