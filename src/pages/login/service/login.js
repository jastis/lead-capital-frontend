import { errorNotifier } from "../../../components/notifier";
import { APP_CONSTANTS } from "../../../constants/app";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const loginUser = async (payload, setLoading) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post(AUTH_ROUTES.LOGIN, payload);
    sessionStorage.setItem(APP_CONSTANTS.token, data?.token?.token);

    sessionStorage.setItem(APP_CONSTANTS.partnerId, data?._id);

    window.location.reload();
    setLoading(false);
  } catch (e) {
    setLoading(false);
    if (e.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
