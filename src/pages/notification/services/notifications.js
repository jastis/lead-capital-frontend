import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getNotification = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.NOTIFICATION);
    return data;
  } catch (e) {
    if (e.response) {
      errorNotifier(
        console.log(
          // e.response
          e.response?.data?.message || e.response?.data?.data?.message
        )
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
