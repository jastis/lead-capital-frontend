import { errorNotifier, successNotifier } from "../../../components/notifier";
import axiosInstance, { AUTH_ROUTES } from "../../../service/api";

export const createDriver = async (payload) => {
  try {
    await axiosInstance.post(AUTH_ROUTES.CREATE_DRIVER, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successNotifier("Driver successfully created");
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

export const getDrivers = async (skip) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(AUTH_ROUTES.DRIVER(skip));
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
