import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const getReports = async (partnerId, skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.GET_REPORT(partnerId, skip));
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

export const createReport = async (payload, setLoading, onClose) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.CREATE_REPORT, payload);
    successNotifier("Report successfully created");
    setLoading && setLoading(false);
    onClose && onClose();
    console.log("r");
  } catch (e) {
    setLoading && setLoading(false);
    console.log("catch");
    if (e.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
    // }finally{
    //   setLoading(false)
    // }
  }
};
