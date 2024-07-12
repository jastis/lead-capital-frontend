import { successNotifier, errorNotifier } from "../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../service/api";

export const signUp = async (payload, setLoading) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post(AUTH_ROUTES.SIGNUP, payload);
    console.log(data);
    successNotifier("Successfull");
    window.location.replace("/");
    // window.location.reload();
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
